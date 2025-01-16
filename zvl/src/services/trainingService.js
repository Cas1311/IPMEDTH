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
        let training = [];
        try {
            const response = await axios.get(`${baseUrl}/trainings/${trainingId}?incl=exercises`);
            training = response.data;
            
        } catch (error) {
            console.error('Error fetching training:', error);
        }
        return training; 
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


