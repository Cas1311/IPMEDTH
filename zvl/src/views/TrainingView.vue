<template>
  <h1>Alle trainingen</h1>
  <div class="container">
    <router-link :to="'/training/create'">
      <Button label="Nieuwe training maken" />
        </router-link>
    
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else class="trainings-list">
    
      <TrainingCard v-for="training in trainings" :key="training.id" :training="training" :show-extra="true" />
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import TrainingCard from '@/components/TrainingCard.vue';


export default {
  data() {
    return {
      trainings: [],
      exercises: [], // Holds all exercises
      loading: true, // Loading state
      
    };
  },
  mounted() {

    this.getTrainings();
  },


  methods: {
    getTrainings() {
      this.loading = true;

      this.$axios
        .get('/trainings?filter[exercises]=all', {
          

        })
        .then((response) => {
          this.trainings = response.data; // Populate exercises array
        })
        .catch((error) => {
          console.error('Error fetching exercises:', error);
        })
        .finally(() => {
          this.loading = false; // Stop loading
        });
    },



  },

  computed: {
    
  },

  components: {
    TrainingCard,
    Button,

  },
};
</script>

<style scoped>
.container{
  min-width: 80%;
}
</style>
