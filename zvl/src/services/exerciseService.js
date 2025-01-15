import axios from 'axios';
    const baseUrl = import.meta.env.VITE_API_URL;

    export async function fetchExercises(filters = {}) {
        let exercises = [];
        const query = new URLSearchParams();
        
        if (filters.skillValue && filters.skillValue.length > 0) {
            query.append("filter[skills]", filters.skillValue.map(skill => skill.id).join(","));
          } else {
            query.append("filter[skills]", "all");
          }
          
        const response = await axios.get(`/exercises?${query.toString()}&filter[categories]=all&filter[requirements]=all`);
        exercises = response.data;
        return exercises;
    }


