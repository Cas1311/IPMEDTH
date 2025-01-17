import axios from 'axios';
    const baseUrl = import.meta.env.VITE_API_URL;

    export async function fetchTrainings() {
        let trainings = [];
        try {
            const response = await axios.get(`${baseUrl}/trainings?filter[exercises]=all`);
            trainings = response.data;
        } catch (error) {
            console.error('Error fetching trainings:', error);
        }
        return trainings; 
    }

    export async function fetchTrainingById(trainingId) {
        try {
            const response = await axios.get(`${baseUrl}/trainings/${trainingId}?incl=exercises`);
            return response.data;
            
        } catch (error) {
            console.error('Error fetching training:', error);
            return null;
        }
    }


    export async function addTraining(formData) {
        
        try {
            const response = await axios.post(`${baseUrl}/trainings`, formData);

            return response; 
        } catch (error) {
            console.error('Error adding training:', error);
            throw error;  
        }
    }

    export async function deleteTraining(trainingId) {
        try {
            console.log(trainingId)
            await axios.delete(`${baseUrl}/trainings/${trainingId}`);
        } catch (error) {
            console.error('Error deleting training:', error);
        }
        
    }

    export const addExercisesToTraining = async (trainingId, exerciseIds) => {
        try {
          
          await axios.post(`${baseUrl}/trainings/${trainingId}/exercises/${exerciseIds.join(',')}`);
        } catch (error) {
          throw new Error('Error adding exercises: ' + error.message);
        }
      }
      
      export const removeExercisesFromTraining = async (trainingId, exerciseIds) => {
        try {
          
          await axios.delete(`${baseUrl}/trainings/${trainingId}/exercises/${exerciseIds.join(',')}`);
        } catch (error) {
          throw new Error('Error removing exercises: ' + error.message);
        }
      }


