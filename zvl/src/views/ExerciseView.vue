<template>
  <div class="container">
    <Filter @skill-filter-changed="handleFilterChange" />

      
    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else class="exercise-list">
      <div class="detail-toggle-container">
            <p>Toon meer informatie</p>
        <ToggleSwitch v-model="checked" />

        </div>
      <!-- Loop through exercises and display each as a ShowData card -->
      <ShowData
        v-for="exercise in getFilteredExercises"
        :key="exercise.id"
        :exercise="exercise"
        :show-extra="checked"
        :show-button="false"
        :show-add-button="false"
        @add-exercise="handleAddExercise"
      />
    </div>
  </div>
</template>

<script>
import ShowData from "@/components/ShowData.vue";
import Filter from "@/components/Filters.vue";
import ToggleSwitch from 'primevue/toggleswitch';
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { mapWritableState } from "pinia";
import { useExerciseStore } from "../stores/exercises";

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
    ShowData, // Use the ShowData component
    Filter,
    ToggleSwitch
  },
};
</script>

<style>

.exercise-list {
  display: flex;
  flex-direction: column;
  width: min(100%, 100vw);
}
.detail-toggle-container{
    align-items: center;
    margin-bottom: 2em;
    gap: 1em;
    display: flex;
    flex-direction: column;
}
</style>
