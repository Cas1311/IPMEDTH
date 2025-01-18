import axiosInstance from './axiosInstance'; 

    export async function fetchTrainings() {
        let trainings = [];
        try {
            const response = await axiosInstance.get('/trainings?filter[exercises]=all');
            trainings = response.data;
        } catch (error) {
            console.error('Error fetching trainings:', error);
        }
        return trainings; 
    }

    export async function fetchTrainingById(trainingId) {
        try {
            const response = await axiosInstance.get(`/trainings/${trainingId}?incl=exercises`);
            return response.data;
            
        } catch (error) {
            console.error('Error fetching training:', error);
            return null;
        }
    }


    export async function addTraining(formData) {
        
        try {
            const response = await axiosInstance.post('/trainings', formData);

            return response; 
        } catch (error) {
            console.error('Error adding training:', error);
            throw error;  
        }
    }

    export async function deleteTraining(trainingId) {
        try {
            console.log(trainingId)
            await axiosInstance.delete(`/trainings/${trainingId}`);
        } catch (error) {
            console.error('Error deleting training:', error);
        }
        
    }

    export const addExercisesToTraining = async (trainingId, exerciseIds) => {
        try {
          
          await axiosInstance.post(`/trainings/${trainingId}/exercises/${exerciseIds.join(',')}`);
        } catch (error) {
          throw new Error('Error adding exercises: ' + error.message);
        }
      }
      
      export const removeExercisesFromTraining = async (trainingId, exerciseIds) => {
        try {
          
          await axiosInstance.delete(`/trainings/${trainingId}/exercises/${exerciseIds.join(',')}`);
        } catch (error) {
          throw new Error('Error removing exercises: ' + error.message);
        }
      }


