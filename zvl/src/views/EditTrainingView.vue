<template>
  <div class="card">
    
    
    <h2>Training bewerken</h2>
    <div class="button-container">
      <form @submit.prevent="submitFullForm">
        <Button
          icon="pi pi-save"
          class="save-button"
          type="submit"
          label="Opslaan"
        />
      </form>
      <router-link :to="'/trainings/'">
        <Button
          icon="pi pi-times"
          class="save-button"
          label="Annuleren"
          severity="secondary"
        />
      </router-link>
    </div>
    <ScrollPanel style="width: 100%; height: 80vh">
      <div v-if="trainingLoading">
      <p>Laden...</p>
    </div>
    <div v-else class="trainings-list">
      <TrainingDetailCard :training="training" :show-extra="false" />
    </div>

    <ExerciseFilters @skill-filter-changed="handleFilterChange" />

      <div>
        <div v-if="loading">
          <p>Laden...</p>
        </div>

        <div v-else class="exercise-list">
          <!-- Loop through exercises and display each as a ShowData card -->
          <SmallExerciseCard
            v-for="exercise in this.getFilteredExercises"
            :key="exercise.id"
            :exercise="exercise"
            :showButton="true"
            :selectedExerciseIds="selectedExerciseIds"
            :selected-exercise-ids="exercisesInTrainingIds"
            @toggle-exercise="toggleExerciseInTraining"
          />
        </div>
      </div>
    </ScrollPanel>

    

  </div>
</template>

<script>
import Button from "primevue/button";
import ScrollPanel from "primevue/scrollpanel";
import ExerciseFilters from "@/components/ExerciseFilters.vue";
import TrainingDetailCard from "@/components/TrainingDetailCard.vue";
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { mapWritableState } from "pinia";
import { useExerciseStore } from "../stores/exercises";
import { useTrainingStore } from "../stores/trainings";
import SmallExerciseCard from "@/components/SmallExerciseCard.vue";

export default {
  data() {
    return {
      currentTrainingId: null,
      exercises: [],
      // training: null,
      // loading: false,
      selectedExerciseIds: [],
      // exercisesInTrainingIds: [],
      selectedRemoveExerciseIds: [],
    };
  },

  mounted() {
    this.getExercises();
    const trainingId = this.$route.params.id; // Get exercise ID from the route params
    this.currentTrainingId = trainingId;

    this.loading = true;
    this.fetchTrainingByIdFromApi(trainingId);
  },

  methods: {
    ...mapActions(useExerciseStore, ["fetchExercisesFromApi", "setExerciseFilters"]),
    ...mapActions(useTrainingStore, ["fetchTrainingByIdFromApi", "addExercisesToTrainingApi", "removeExercisesFromTrainingApi"]),

    getExercises() {
      this.fetchExercisesFromApi();
    },

    handleFilterChange(newFilters) {
      // Update the filters and refetch exercises based on skill filters
      this.setExerciseFilters(newFilters);
    },

    toggleExerciseInTraining(exerciseId) {
      const isAdded = this.exercisesInTrainingIds.includes(exerciseId);

      if (isAdded) {
        this.removeExerciseFromTraining(exerciseId);
      } else {
        this.addExerciseToTraining(exerciseId);
      }
    },

    // Add exercise to the training
    addExerciseToTraining(exerciseId) {
      this.exercisesInTrainingIds.push(exerciseId);
      this.selectedExerciseIds.push(exerciseId);
      this.selectedRemoveExerciseIds = this.selectedRemoveExerciseIds.filter(
        (id) => id !== exerciseId
      );
    },

    // Remove exercise from the training
    removeExerciseFromTraining(exerciseId) {
      this.exercisesInTrainingIds = this.exercisesInTrainingIds.filter(
        (id) => id !== exerciseId
      );
      this.selectedExerciseIds = this.selectedExerciseIds.filter(
        (id) => id !== exerciseId
      );
      this.selectedRemoveExerciseIds.push(exerciseId);
    },

    async submitFullForm() {
      try {
        // Check if the arrays are not empty before submitting
        if (
          this.selectedExerciseIds.length === 0 &&
          this.selectedRemoveExerciseIds.length === 0
        ) {
          this.message = "No exercises to add or remove.";
          this.$router.push(`/training/${this.training.id}`);
          return; // Exit early if both arrays are empty
        }

        // Construct the URL only if the arrays contain data
        const addExercises =
          this.selectedExerciseIds.length > 0 ? this.selectedExerciseIds.join(",") : "";
        const removeExercises =
          this.selectedRemoveExerciseIds.length > 0
            ? this.selectedRemoveExerciseIds.join(",")
            : "";

        // If there's something to add
        if (addExercises) {
          await this.addExercisesToTrainingApi(this.currentTrainingId,this.selectedExerciseIds);
        }

        // If there's something to remove
        if (removeExercises) {
          await this.removeExercisesFromTrainingApi(this.currentTrainingId, this.selectedRemoveExerciseIds)
        }

        this.message = "Training updated successfully!";
        this.$router.push(`/training/${this.training.id}`);
      } catch (error) {
        console.error(error.response?.data || error.message);
        this.message =
          "An error occurred while adding/removing exercises from the training.";
      }
    },
  },

  computed: {
    ...mapWritableState(useExerciseStore, ["exercises"]),
    ...mapWritableState(useExerciseStore, ["loading"]),
    ...mapWritableState(useExerciseStore, ["exerciseFilters"]),
    ...mapWritableState(useTrainingStore, ["exercisesInTrainingIds"]),
    ...mapState(useExerciseStore, ["getFilteredExercises"]),
    ...mapState(useTrainingStore, ["training"]),
    ...mapState(useTrainingStore, { trainingLoading: "loading" }),
  },

  components: {
    Button,
    ScrollPanel,
    ExerciseFilters,
    TrainingDetailCard,
    SmallExerciseCard,
  },
};
</script>

<style scoped>
:deep(.p-steppanel) {
  border-radius: 1em;
}

.name-card {
  background-color: var(--theme-secondary);
}

.card {
  margin: 1em;
}

.button-container {
  margin: 1em;
  display: flex;
  gap: 0.5em;
  justify-content: center;
  align-items: center;
}

.save-button{
    width: min(40vw, 15em);
}

button,
.p-button {
  min-height: 3em;
}
</style>
