import axiosInstance from './axiosInstance'; 

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
        query.append("filter[skills]", "all");  
    }

    query.append("filter[categories]", "all");
    query.append("filter[requirements]", "all");

    try {
        const response = await axiosInstance.get(`/exercises?${query.toString()}`);
        exercises = response.data;
    } catch (error) {
        console.error('Error fetching exercises:', error);
    }

    return exercises;
}

export async function fetchExerciseById(exerciseId) {
    try {
        const response = await axiosInstance.get(`/exercises/${exerciseId}??incl=skills,requirements,category`);
        return response.data;
        
    } catch (error) {
        console.error('Error fetching training:', error);
        return null;
    }
}


export async function deleteExercise(exerciseId) {
    try {
        console.log(exerciseId)
        await axiosInstance.delete(`/exercises/${exerciseId}`);
    } catch (error) {
        console.error('Error deleting training:', error);
    }
    
}
