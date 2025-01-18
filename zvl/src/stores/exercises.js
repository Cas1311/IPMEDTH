import { defineStore } from 'pinia'
import { fetchExercises } from '@/services/exerciseService';
import { fetchExerciseById } from '@/services/exerciseService';
import { deleteExercise } from '@/services/exerciseService';


export const useExerciseStore = defineStore("exercise", {
    state: () => ({
        exercise: [],
        exercises: [],
        loading: false,
        exerciseFilters: {
            skillValue: [],
            durationSliderValue: [1, 60],
            minimumPlayers: '',
            minimumAge: '',
            waterExercise: '',
        },
    }),
    getters: {
        getFilteredExercises(state) {
            const { exercises, exerciseFilters } = state;
      
            // Filter exercises locally based on other filters (duration, players, age, water exercise)
            return exercises.filter(exercise => {
              const { durationSliderValue, minimumPlayers, minimumAge, waterExercise } = exerciseFilters;
              const [min, max] = durationSliderValue;
      
              // Apply local filters (for duration, players, etc.)
              const matchesDuration = exercise.duration >= min && exercise.duration <= max;
              const matchesPlayers = minimumPlayers === '' || exercise.minimum_players >= minimumPlayers;
              const matchesAge = minimumAge === '' || exercise.minimum_age <= minimumAge;
              const matchesWater = waterExercise === '' || Number(exercise.water_exercise) === waterExercise;
      
              return matchesDuration && matchesPlayers && matchesAge && matchesWater;
            });
          }

    },
    actions: {
        async fetchExercisesFromApi() {
            this.loading = true; 
            
            try {
                const exercises = await fetchExercises(this.exerciseFilters);
                this.exercises = exercises;
            } catch (error) {
                console.error("Failed to fetch exercises:", error);
            } finally {

                this.loading = false; 

            }
        },

        setExerciseFilters(newFilters) {
          // Check if the filters have actually changed before proceeding
          const filtersChanged = Object.keys(newFilters).some(key => {
              return JSON.stringify(this.exerciseFilters[key]) !== JSON.stringify(newFilters[key]);
          });
          
          // If no filters have changed, do nothing
          if (!filtersChanged) {
              return;
          }
      
          // Clear the previous debounce timer if it exists
          if (this.debounceTimer) {
              clearTimeout(this.debounceTimer);
          }
      
          // Set the new filters after the debounce delay
          this.debounceTimer = setTimeout(() => {

              this.exerciseFilters = { ...this.exerciseFilters, ...newFilters };
      
              // After filters are set, fetch exercises based on the updated filters
              this.fetchExercisesFromApi();  // Fetch exercises after updating the filters
          }, 300);  // Debounce delay of 300ms
      },
      
      async fetchExerciseByIdFromApi(exerciseId) {
        this.loading = true;
        try {
            const response = await fetchExerciseById(exerciseId);
            if (response) {
                this.exercise = response; 
                
            } else {
                this.message = 'Failed to fetch training data.';
            }
        } catch (error) {
            console.error("Error fetching training data:", error);
            this.message = 'An error occurred while fetching training data.';
        } finally {
            this.loading = false;
        }
    },

      async deleteExerciseApi(exerciseId){
        try {
            deleteExercise(exerciseId);
            this.exercises = this.exercises.filter(exercises => exercises.id !== exerciseId);
        } catch (error) {
            console.error("Failed to delete exercise:", error);
        } 
    }
        
    },
});


