<template>
    <div class="card">
        <h2>Naam van de training</h2>
        <Card class="nameinputcard">
            <template #title></template>
            <template #content>
                <div v-if="loading">
                    <p>Loading...</p>
                </div>
                <div v-else-if="training">
                    <p>Naam van de training: {{ training.name }}</p>
                </div>
                <div v-else>
                    <p>Geen training gevonden</p>
                </div>
            </template>
            <p v-if="message">{{ message }}</p>
        </Card>

        <h2>Oefeningen toevoegen</h2>
        <ScrollPanel style="width: 100%; height: 30em">
            <div>
                <Filter @skill-filter-changed="handleFilterChange" />

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
        <form @submit.prevent="submitFullForm">

            <Button type="submit" label="Training opslaan" />
        </form>

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
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { mapWritableState } from "pinia";
import { useExerciseStore } from "../stores/exercises";


export default {

    data() {
        return {
            currentTrainingId: null,
            exercises: [],
            training: null,
            loading: false,
            selectedExerciseIds: [],
            exercisesInTrainingIds: [],
            selectedRemoveExerciseIds: [],

        }
    },

    mounted() {
        this.getExercises()
        const trainingId = this.$route.params.id; // Get exercise ID from the route params
        this.currentTrainingId = trainingId;

        this.loading = true;
        this.fetchTrainingData(trainingId);
    },

    methods: {
        ...mapActions(useExerciseStore, ['fetchExercisesFromApi', 'setExerciseFilters']),

        getExercises() {
            this.fetchExercisesFromApi()
        },

        handleFilterChange(newFilters) {
            // Update the filters and refetch exercises based on skill filters
            this.setExerciseFilters(newFilters);
        },

        fetchTrainingData(trainingId) {
            this.$axios
                .get(`/trainings/${trainingId}?incl=exercises`)
                .then(response => {
                    this.training = response.data;
                    this.exercisesInTrainingIds = response.data.exercises.map(exercise => exercise.id);
                })
                .catch(error => {
                    console.error('Error fetching exercise:', error);
                })
                .finally(() => {
                    this.loading = false;
                });
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
        ...mapState(useExerciseStore, ["getFilteredExercises"]),

    },

    components: {
        Button,
        InputText,
        FloatLabel,
        ScrollPanel,
        ExerciseView,
        Card,
        Filter,
        ShowData

    },
};
</script>

<style scoped>
:deep(.p-steppanel) {

    border-radius: 1em;
}
</style>