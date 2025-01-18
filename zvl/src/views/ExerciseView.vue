<template>
  <div class="container">
    <ExerciseFilters @skill-filter-changed="handleFilterChange" />
    <div class="detail-toggle-container">
      <p>Details</p>
      <ToggleSwitch v-model="checked" />
    </div>
    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else class="exercise-list">
      <div class="exercise-list">
        <!-- Loop through exercises and display each as a ShowData card -->
        <SmallExerciseCard
          v-for="exercise in getFilteredExercises"
          :key="exercise.id"
          :exercise="exercise"
          :show-extra="checked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseFilters from "@/components/ExerciseFilters.vue";
import ToggleSwitch from "primevue/toggleswitch";
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { mapWritableState } from "pinia";
import { useExerciseStore } from "../stores/exercises";
import SmallExerciseCard from "@/components/SmallExerciseCard.vue";

export default {
  setup() {
    const exerciseStore = useExerciseStore();
    return { exerciseStore };
  },
  data() {
    return {
      //exercises: [],// Holds all exercises
      loading: false, // Loading state
      durationSliderValue: [1, 60],
      playerSliderValue: "",
      ageValue: 18,
      waterValue: "",
      checked: false,
    };
  },
  mounted() {
    this.exerciseStore.fetchExercisesFromApi();
  },

  methods: {
    ...mapActions(useExerciseStore, ["fetchExercises", "setExerciseFilters"]),

    handleFilterChange(newFilters) {
      // Update the filters and refetch exercises based on skill filters
      this.setExerciseFilters(newFilters);
    },

    handleAddExercise(exerciseId) {
      this.$emit("exercise-added", exerciseId);
    },
  },

  computed: {
    ...mapWritableState(useExerciseStore, ["exercises"]),
    ...mapWritableState(useExerciseStore, ["loading"]),
    ...mapWritableState(useExerciseStore, ["exerciseFilters"]),
    ...mapState(useExerciseStore, ["getFilteredExercises"]),

    getFilteredExercises() {
      return this.exerciseStore.getFilteredExercises;
    },
  },

  components: {
    ExerciseFilters,
    ToggleSwitch,
    SmallExerciseCard,
  },
};
</script>

<style scoped>
.container {
  margin: 1em;
}

.exercise-list {
  display: flex;
  flex-direction: column;
  width: min(100%, 100vw);
}
.detail-toggle-container {
  align-items: center;
  margin-bottom: 2em;
  gap: 1em;
  display: flex;
}
</style>
