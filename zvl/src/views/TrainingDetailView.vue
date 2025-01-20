<template>
    <div class="training-container">
    <h2>Training informatie</h2>
    
        <div v-if="trainingLoading">
            <p>Laden...</p>
        </div>
        <div v-else class="trainings-list">

            <TrainingDetailCard :training="training" @delete-training="deleteTraining" :show-extra="true"/>

        </div>
        <h2>Oefeningen</h2>
        <div class="detail-toggle-container">
            <p>Details</p>
        <ToggleSwitch v-model="checked" />
        </div>
        
        <div v-if="this.loading">
            <p>Laden...</p>
        </div>


        <div v-else class="exercise-list">
            <SmallExerciseCard v-for="exercise in mergedExercises" :key="exercise.id" :exercise="exercise"
                :show-extra="checked" />
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button';
import TrainingDetailCard from '@/components/TrainingDetailCard.vue';
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { useTrainingStore } from '../stores/trainings';
import { useExerciseStore } from "../stores/exercises";
import SmallExerciseCard from '@/components/SmallExerciseCard.vue';
import ToggleSwitch from 'primevue/toggleswitch';


export default {


    data() {
        return {
            // mergedExercises: [],
            checked: false,


        };
    },
    mounted() {
        const trainingId = this.$route.params.id;

        this.fetchTrainingByIdFromApi(trainingId);
        this.fetchExercisesFromApi();



    },


    methods: {
        ...mapActions(useTrainingStore, ['fetchTrainingByIdFromApi']),
        ...mapActions(useExerciseStore, ['fetchExercisesFromApi']),
        ...mapActions(useTrainingStore, ['deleteTrainingApi']),

        deleteTraining(trainingId) {
            this.deleteTrainingApi(trainingId)

        }


    },

    computed: {
        ...mapState(useTrainingStore, ['training']),
        ...mapState(useExerciseStore, ['exercises']),
        ...mapState(useExerciseStore, ['loading']),
        ...mapState(useTrainingStore, {trainingLoading: 'loading'}),

        mergedExercises() {
            if (!this.training || !Array.isArray(this.training.exercises) || !this.exercises) {
                return []; // Return an empty array if training or exercises are missing
            }

            const allExercises = this.exercises; // All exercises fetched from exercise store

            // Merge the training exercises with all available exercises
            return this.training.exercises.map((trainingExercise) => {
                const matchedExercise = allExercises.find(
                    (exercise) => exercise.id === trainingExercise.id
                );
                return matchedExercise
                    ? { ...trainingExercise, ...matchedExercise }
                    : trainingExercise;
            });
        },
    },

    components: {
        TrainingDetailCard,
        Button,
        SmallExerciseCard,
        ToggleSwitch

    },
};
</script>

<style scoped>
.training-container {
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  margin: 1em; 
}

.detail-toggle-container{
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
}

</style>