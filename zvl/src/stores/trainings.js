import { defineStore } from 'pinia'
import { fetchTrainings } from '@/services/trainingService';


export const useTrainingStore = defineStore("training", {
    state: () => ({
        trainings: [],
        loading: false,
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
        
    },
});


