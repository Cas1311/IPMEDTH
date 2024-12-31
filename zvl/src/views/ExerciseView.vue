<template>
  <div>
    <h1>All Exercises</h1>

    <Filter @filter-changed="applyFilters" />

    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else class="exercise-list">
      <!-- Loop through exercises and display each as a ShowData card -->
      <ShowData v-for="exercise in exercises" :key="exercise.id" :exercise="exercise" :show-extra="true" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ShowData from '@/components/ShowData.vue';
import Filter from '@/components/Filters.vue';

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


  methods: {
    getFilteredExercises(params = {}) {
      this.loading = true;
        
      axios
        .get('http://127.0.0.1:8000/api/exercises', {
          params

        })
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

    applyFilters(selectedFilters) {
      const skillIds = selectedFilters.map(skill => skill.id).join(',');
      const params = skillIds ? { 'filter[skills]': skillIds } : {};
      this.getFilteredExercises(params);
    }
  },
  components: {
    ShowData, // Use the ShowData component
    Filter
  },
};
</script>
