import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

export async function fetchExercises(filters = {}) {
    let exercises = [];
    const query = new URLSearchParams();

    // Extract the selected skills (keys in the format `categoryId-skillId`)
    const selectedSkills = Object.keys(filters.skillValue)
        .filter(key => filters.skillValue[key].checked)  // Only include skills that are checked
        .map(key => key.split('-')[1])  // Split the key and get the second part (skillId)
        .join(",");  // Join the selected skillIds with commas

    // If no skills are selected, set to 'all'
    if (selectedSkills.length > 0) {
        query.append("filter[skills]", selectedSkills);
    } else {
        query.append("filter[skills]", "all");  // Default to 'all' if no skills are selected
    }

    // Handle other filters (like categories, requirements, etc.)
    query.append("filter[categories]", "all");
    query.append("filter[requirements]", "all");

    // Perform the API request
    try {
        const response = await axios.get(`${baseUrl}/exercises?${query.toString()}`);
        exercises = response.data;
        console.log('Fetched exercises with filters:', filters);
    } catch (error) {
        console.error('Error fetching exercises:', error);
    }

    return exercises;
}
