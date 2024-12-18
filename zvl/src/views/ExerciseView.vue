<template>
  <div>
    <h1>All Exercises</h1>

    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else class="exercise-list">
      <!-- Loop through exercises and display each as a ShowData card -->
      <ShowData v-for="exercise in exercises" :key="exercise.id" :exercise="exercise" :show-extra="false" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ShowData from '@/components/ShowData.vue';

export default {
  data() {
    return {
      exercises: [], // Holds all exercises
      loading: true, // Loading state
    };
  },
  mounted() {
    // Fetch all exercises from the API
    axios
      .get('http://127.0.0.1:8000/api/exercises') // Update the URL if needed
      .then((response) => {
        this.exercises = response.data; // Populate exercises array
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error);
      })
      .finally(() => {
        this.loading = false; // Stop loading
      });
  },
  components: {
    ShowData, // Use the ShowData component
  },
};
</script>
