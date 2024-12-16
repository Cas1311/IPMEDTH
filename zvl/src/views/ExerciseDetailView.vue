<template>
    <div>
      <h1>Exercise Detail</h1>
      <div v-if="exercise">
        <h2>{{ exercise.name }}</h2>
        <p>{{ exercise.description }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        exercise: null, // Store exercise data
      };
    },
    mounted() {
      const exerciseId = this.$route.params.id; // Get exercise ID from route params
  
      // Fetch the exercise details using the ID
      axios
        .get(`https://zvl-trainingen.wptraining.info/api/exercises/${exerciseId}`)
        .then((response) => {
          this.exercise = response.data; // Store the fetched data in `exercise`
        })
        .catch((error) => {
          console.error('Error fetching exercise data:', error);
        });
    },
  };
  </script>
  