<template>
 
  <div class="training-container">
    
    <h1>Alle trainingen</h1>
    <div v-if="isAuthenticated">
      <router-link :to="'/training/create'">
      <Button label="Nieuwe training maken" />
        </router-link>
    </div>
    
    
    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else class="trainings-list">
      <TrainingCard v-for="training in trainings" :key="training.id" :training="training" :show-extra="true" @delete-training="deleteTraining"/>
    </div>

  </div>
  
</template>

<script>
import Button from 'primevue/button';
import TrainingCard from '@/components/TrainingCard.vue';
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { useTrainingStore } from '../stores/trainings';
import { useAuthStore } from '../stores/auth';

export default {

  setup(){
        const trainingStore = useTrainingStore()
        return { trainingStore };
    },
  data() {
    return {
      
      exercises: [], // Holds all exercises
      loading: false, // Loading state
      
    };
  },
  mounted() {

    this.trainingStore.fetchTrainingsFromApi()
  },


  methods: {
  ...mapActions(useTrainingStore, ['deleteTrainingApi']),

  deleteTraining(trainingId){
    this.deleteTrainingApi(trainingId)
    
  }
    


  },

  computed: {
    ...mapState(useTrainingStore, ['trainings']),
    ...mapState(useAuthStore, ['isAuthenticated'])
  },

  components: {
    TrainingCard,
    Button,

  },
};
</script>

<style scoped>
.training-container {
  display: flex;
  flex-direction: column; 
  justify-content: top; 
  align-items: center; 
  min-height: 100vh; 
  padding: 1rem;
}

.trainings-list {
  display: flex; 
  flex-direction: column; 
  
  width: 100%; 
  max-width: 80rem; 
}
</style>
