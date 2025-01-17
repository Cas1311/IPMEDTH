<template>
  <div class="card-container">
    <h2>Nieuwe training maken</h2>
    <Card class="card">

      <template #title></template>
      <template #content>
        
          
          <form class="name-card" v-if="!nameSubmitted" @submit.prevent="addTraining">
          <FloatLabel>
            <InputText type="text" v-model="formData.name" />
            <label for="over_label">Naam van de training</label>
           
          </FloatLabel>
          <div v-if="this.errorMessage" class="error-message">
          <p>Er is al een training met deze naam.</p>
        </div>
          <Button type="submit" label="Opslaan" :disabled="!formData.name" />
        </form>
        
       
      </template>

    </Card>


  </div>
</template>

<script>
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import ExerciseView from './ExerciseView.vue';
import ScrollPanel from 'primevue/scrollpanel';
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { mapWritableState } from 'pinia';
import { useTrainingStore } from '../stores/trainings';


export default {
  data() {
    return {
      formData: {
        name: ''
      },
      selectedExerciseIds: [],
      message: '',
      nameSubmitted: false,
      receivedId: '',
    }
  },


  methods: {
    ...mapActions(useTrainingStore, ['addTrainingApi']),

    async addTraining() {
      try {

        const response = await this.addTrainingApi(this.formData);

        // Ensure that response.data and response.data.data exist
        if (response && response.data && response.data.data && response.data.data.id) {
          this.receivedId = response.data.data.id;  // Retrieve the training ID
          this.message = response.data.message;     // Get the success message

          // Redirect to the edit page
          this.$router.push(`/training/edit/${this.receivedId}`);
        } else {
          console.error('Invalid response structure:', response);
          this.message = "Training creation failed. Please try again.";
        }

      } catch (error) {
        console.error("Error while adding training:", error);
        this.message = "An error occurred while adding the training.";
      }
    }


  },

  computed: {
    ...mapState(useTrainingStore, ['errorMessage'])
  },

  components: {
    Button,
    InputText,
    FloatLabel,
    ScrollPanel,
    ExerciseView,
    Card
  },
};
</script>

<style scoped>
.card-container{
  display: flex;
  flex-direction: column; 
  justify-content: top; 
  align-items: center; 
  min-height: 100vh; 
  padding: 1rem;
}


.name-card{
  display: flex;
  flex-direction: column; 
  align-items: center; 
  gap: 1em;
 
  
}
</style>
