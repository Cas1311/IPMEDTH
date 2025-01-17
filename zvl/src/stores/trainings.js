import { defineStore } from 'pinia'
import { fetchTrainings } from '@/services/trainingService';
import { fetchTrainingById } from '@/services/trainingService';
import { addTraining } from '@/services/trainingService';
import { deleteTraining } from '@/services/trainingService';

export const useTrainingStore = defineStore("training", {
    state: () => ({
        trainings: [],
        training: [],
        loading: false,
        errorMessage: '',
        exercisesInTrainingIds: [],
    }),
    getters: {
       

    },
    actions: {
        async fetchTrainingsFromApi() {
            this.loading = true; 
            
            try {
                const trainings = await fetchTrainings();
                this.trainings = trainings;
            } catch (error) {
                console.error("Failed to fetch trainings:", error);
            } finally {

                this.loading = false; 

            }
        },

        async fetchTrainingByIdFromApi(trainingId) {
            this.loading = true;
            try {
                const response = await fetchTrainingById(trainingId);
                if (response) {
                    this.training = response; // Set training data from the service response
                    // Store the exercise IDs
                    this.exercisesInTrainingIds = response.exercises.map(exercise => exercise.id);
                    this.message = '';
                } else {
                    this.message = 'Failed to fetch training data.';
                }
            } catch (error) {
                console.error("Error fetching training data:", error);
                this.message = 'An error occurred while fetching training data.';
            } finally {
                this.loading = false;
            }
        }
        ,

        async addTrainingApi(formData) {
            
            try {
                const response = await addTraining(formData); 
                this.formData = response.data;
                this.trainings.push(response); 
                return response; 
            } catch (error) {
                this.errorMessage = error.response.data.message;
                console.error("Failed to add training:", error);
                throw error;  
            }
        },
    
        
        async deleteTrainingApi(trainingId){
            try {
                deleteTraining(trainingId);
                this.trainings = this.trainings.filter(training => training.id !== trainingId);
            } catch (error) {
                console.error("Failed to delete trainings:", error);
            } 
        }
    },
});


