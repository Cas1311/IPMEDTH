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


