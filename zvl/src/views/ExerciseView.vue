<template>
  <div>
    <h1>All Exercises</h1>
    <div><label>Select category and skills</label>
      <multiselect v-model="value" :options="options" :multiple="true" group-values="skill" group-label="category"
        :group-select="true" placeholder="Type to search" track-by="name" label="name"><span slot="noResult">Oops! No
          elements found. Consider changing the search query.</span>
      </multiselect>
      <p>{{ value }}</p>
    </div>
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
import Multiselect from 'vue-multiselect';

export default {
  data() {
    return {
      exercises: [], // Holds all exercises
      loading: true, // Loading state
      options: [
          {
            category: 'Warming up',
            skill: [
              { id: '1', name: 'Rekken' },
              { id: '2', name: 'Cardio' }
            ]
          },
          {
            category: 'Techniek',
            skill: [
              { id: '3', name: 'Gooien-Vangen' },
              { id: '4', name: 'Polocrawl' },
              { id: '5', name: 'Draai' },
              { id: '6', name: 'Agility' },
              { id: '7', name: 'Schieten' },
              { id: '8', name: 'Fietsenbenen' },
              { id: '9', name: 'Zwemtechniek' }
            ]
          },
          {
            category: 'Tactiek',
            skill: [
              { id: '10', name: 'Midvoor-Midachter' },
              { id: '11', name: 'Manmeer-Manminder' },
              { id: '12', name: 'Aanval' },
              { id: '13', name: 'Verdediging' },
              { id: '14', name: 'Heads-Up' },
              { id: '15', name: 'Wisselen' },
              { id: '16', name: 'Wedstrijdstress' }
            ]
          },
          {
            category: 'Conditie',
            skill: [
              { id: '17', name: 'Ademhaling' },
              { id: '18', name: 'Spieren' },
              { id: '19', name: 'Cardio' },
              { id: '20', name: 'Sprint' }
            ]
          },
          {
            category: 'Cooling down',
            skill: [
              { id: '21', name: 'Rekken' }
            ]
          },
          {
            category: 'Keeper',
            skill: []
          },
          {
            category: 'Theorie',
            skill: [
              { id: '22', name: 'Regels' },
              { id: '23', name: 'Handgebaren-Scheidsrechter' },
              { id: '24', name: 'Overtredingen' }
            ]
          }
      ],
      value: []
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

  watch: {
    'value': {
      handler: function (after, before) {
        this.getFilteredExercises();
      },
      deep: true
    },

  },

  methods: {
    getFilteredExercises() {
      
      let params = {};
      if (this.value.length > 0) {
          
          const skillIds = this.value.map(skill => skill.id).join(',');
          
          params = {
            'filter[skills]': skillIds
          };
        }
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
    }
  },
  components: {
    ShowData, // Use the ShowData component
    Multiselect
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>