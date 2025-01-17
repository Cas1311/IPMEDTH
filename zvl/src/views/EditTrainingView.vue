<template>
    <div class="card">
        

        <div v-if="trainingLoading">
            <p>Loading...</p>
        </div>
        <div v-else class="trainings-list">

            <TrainingDetailCard :training="training" :show-extra="false"/>


        </div>

        <h2>Oefeningen toevoegen</h2>
        <Filter @skill-filter-changed="handleFilterChange" />
        <ScrollPanel style="width: 100%; height: 30em">
            <div>


                <div v-if="loading">
                    <p>Loading...</p>
                </div>

                <div v-else class="exercise-list">
                    <!-- Loop through exercises and display each as a ShowData card -->
                    <ShowData v-for="exercise in this.getFilteredExercises" :key="exercise.id" :exercise="exercise"
                        :show-extra="false" :show-button="true" :selected-exercise-ids="exercisesInTrainingIds"
                        @toggle-exercise="toggleExerciseInTraining" />
                </div>
            </div>
        </ScrollPanel>
        <div class="button-container">
            <form @submit.prevent="submitFullForm">

                <Button icon="pi pi-save" class="save-button" type="submit" label="Training opslaan" />
            </form>
            <router-link :to="'/trainings/'">
                <Button icon="pi pi-times" class="save-button" label="Annuleren" severity="secondary" />
            </router-link>

        </div>


    </div>

</template>

<script>
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import ExerciseView from './ExerciseView.vue';
import ScrollPanel from 'primevue/scrollpanel';
import ShowData from "@/components/ShowData.vue";
import Filter from "@/components/Filters.vue";
import TrainingDetailCard from '@/components/TrainingDetailCard.vue';
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { mapWritableState } from "pinia";
import { useExerciseStore } from "../stores/exercises";
import { useTrainingStore } from "../stores/trainings";

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

        }
    },

    mounted() {
        this.getExercises()
        const trainingId = this.$route.params.id; // Get exercise ID from the route params
        this.currentTrainingId = trainingId;

        this.loading = true;
        this.fetchTrainingByIdFromApi(trainingId);
    },

    methods: {
        ...mapActions(useExerciseStore, ['fetchExercisesFromApi', 'setExerciseFilters']),
        ...mapActions(useTrainingStore, ['fetchTrainingByIdFromApi']),

        getExercises() {
            this.fetchExercisesFromApi()
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
            this.selectedRemoveExerciseIds = this.selectedRemoveExerciseIds.filter(id => id !== exerciseId);
        },

        // Remove exercise from the training
        removeExerciseFromTraining(exerciseId) {
            this.exercisesInTrainingIds = this.exercisesInTrainingIds.filter(id => id !== exerciseId);
            this.selectedExerciseIds = this.selectedExerciseIds.filter(id => id !== exerciseId);
            this.selectedRemoveExerciseIds.push(exerciseId);
        },

        async submitFullForm() {
            try {
                // Check if the arrays are not empty before submitting
                if (this.selectedExerciseIds.length === 0 && this.selectedRemoveExerciseIds.length === 0) {
                    this.message = "No exercises to add or remove.";
                    this.$router.push(`/training/${this.training.id}`);
                    return; // Exit early if both arrays are empty
                }

                // Construct the URL only if the arrays contain data
                const addExercises = this.selectedExerciseIds.length > 0 ? this.selectedExerciseIds.join(',') : '';
                const removeExercises = this.selectedRemoveExerciseIds.length > 0 ? this.selectedRemoveExerciseIds.join(',') : '';

                // If there's something to add
                if (addExercises) {
                    const addUrl = `/trainings/${this.currentTrainingId}/exercises/${addExercises}`;
                    await this.$axios.post(addUrl);
                    console.log('Exercises added to training');
                }

                // If there's something to remove
                if (removeExercises) {
                    const removeUrl = `/trainings/${this.currentTrainingId}/exercises/${removeExercises}`;
                    await this.$axios.delete(removeUrl);
                    console.log('Exercises removed from training');
                }

                this.message = "Training updated successfully!";
                this.$router.push(`/trainings`);
            } catch (error) {
                console.error(error.response?.data || error.message);
                this.message = "An error occurred while adding/removing exercises from the training.";
            }
        }
    },

    computed: {
        ...mapWritableState(useExerciseStore, ["exercises"]),
        ...mapWritableState(useExerciseStore, ["loading"]),
        ...mapWritableState(useExerciseStore, ["exerciseFilters"]),
        ...mapWritableState(useTrainingStore, ["exercisesInTrainingIds"]),
        ...mapState(useExerciseStore, ["getFilteredExercises"]),
        ...mapState(useTrainingStore, ["training"]),
        ...mapState(useTrainingStore, {trainingLoading: 'loading'}),

    },

    components: {
        Button,
        InputText,
        FloatLabel,
        ScrollPanel,
        ExerciseView,
        Card,
        Filter,
        ShowData,
        TrainingDetailCard

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
    flex-wrap: wrap;
}

button,
.p-button {
    min-height: 3em;
}
</style>