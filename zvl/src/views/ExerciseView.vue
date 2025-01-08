<template>
  <div>
    <h1>All Exercises</h1>

    <Filter 
    @skill-filter-changed="applySkillFilters" 
    @duration-slider-changed="updateDurationSliderValue" 
    @player-slider-changed="updatePlayerSliderValue"
    @age-changed="updateAgeValue" 
    @water-changed="updateWaterValue" />

    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else class="exercise-list">
      <!-- Loop through exercises and display each as a ShowData card -->
      <ShowData v-for="exercise in filteredExercises" :key="exercise.id" :exercise="exercise" :show-extra="false" />
    </div>
  </div>
</template>

<script>

import ShowData from '@/components/ShowData.vue';
import Filter from '@/components/Filters.vue';

export default {
  data() {
    return {
      exercises: [], // Holds all exercises
      loading: true, // Loading state
      durationSliderValue: [1, 60],
      playerSliderValue: '',
      ageValue: 18,
      waterValue: '',
    };
  },
  mounted() {
    // Fetch all exercises from the API
    this.$axios
      .get('/exercises?filter[skills]=all') // Update the URL if needed
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

      this.$axios
        .get('/exercises', {
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

    applySkillFilters(selectedFilters) {
      let params = {};

      if (selectedFilters.length > 0) {
        const skillIds = selectedFilters.map(skill => skill.id).join(',');
        params['filter[skills]'] = skillIds;
      } else {
        params['filter[skills]'] = 'all';
      }

      this.getFilteredExercises(params);
    },

    updateDurationSliderValue(value) {
      this.durationSliderValue = value;
    },

    updatePlayerSliderValue(value) {
      this.playerSliderValue = value;
    },

    updateAgeValue(value) {
      this.ageValue = value;
    },

    updateWaterValue(value) {
      this.waterValue = value;
    }

  },

  computed: {
    // Filter exercises locally based on slider values
    filteredExercises() {
      const [min, max] = this.durationSliderValue;
      console.log('hi');
      return this.exercises.filter(exercise => {
        const matchesDuration = exercise.duration >= min && exercise.duration <= max;
        const matchesPlayers = this.playerSliderValue === '' || exercise.minimum_players <= this.playerSliderValue;
        const matchesAge = this.ageValue === '' || exercise.minimum_age <= this.ageValue;
        const matchesWater = this.waterValue === '' || Number(exercise.water_exercise) === this.waterValue;

        return matchesDuration &&matchesPlayers && matchesAge && matchesWater;
      });
    }
  },

  components: {
    ShowData, // Use the ShowData component
    Filter
  },
};
</script>
