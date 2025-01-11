<template>
  <div class="card">
    <h2>Naam van de training</h2>
    <Card class="nameinputcard">

      <template #title></template>
      <template #content>
        <form v-if="!nameSubmitted" @submit.prevent="submitNameForm">
          <FloatLabel>
            <InputText type="text" v-model="formData.name" />
            <label for="over_label">Naam van de training</label>
            <Button type="submit" label="Opslaan" />
          </FloatLabel>

        </form>
        <div v-else>
          <p><strong>Naam van de training:</strong> {{ formData.name }}</p>
        </div>
        <p v-if="message">{{ message }}</p>
      </template>

    </Card>

    <div v-if="nameSubmitted">
      <h2>Oefeningen toevoegen</h2>
      {{  selectedExerciseIds }}
      <ScrollPanel style="width: 100%; height: 50em">
        <ExerciseView @exercise-added="addExerciseToTraining"></ExerciseView>
      </ScrollPanel>
      <form @submit.prevent="submitFullForm">

        <Button type="submit" label="Training opslaan" />
        </form>

    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import ExerciseView from './ExerciseView.vue';
import ScrollPanel from 'primevue/scrollpanel';


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
    addExerciseToTraining(exerciseId) {
    if (!this.selectedExerciseIds.includes(exerciseId)) {
      this.selectedExerciseIds.push(exerciseId);
      console.log('Exercise added with ID:', exerciseId);
    } else {
      console.log('Exercise with ID already added:', exerciseId);
    }

    console.log('Selected exercise IDs:', this.selectedExerciseIds);
  },

    async submitNameForm() {
      try {
        const response = await this.$axios.post(
          "/trainings",
          this.formData
        );

        this.responseData = response.data;
        this.receivedId = response.data.data.id;
        
        this.message = response.data.message;

        this.nameSubmitted = true;

    
        console.log('Training ID:', this.receivedId);

      } catch (error) {
        console.error(error.response?.data || error.message);
        this.message = "An error occurred while submitting the form.";
      }
    },

    async submitFullForm() {
 
    if (this.selectedExerciseIds.length === 0) {
      console.log("No exercises selected.");
      return;
    }

    try {
    
      
      const exercisesIdsString = this.selectedExerciseIds.join(',');
      const url = `http://127.0.0.1:8000/api/trainings/${this.receivedId}/exercises/${exercisesIdsString}`;

 
      const response = await this.$axios.post(url);


      console.log('Exercises added to training:', response.data);
      this.message = response.data.message;

    } catch (error) {
      console.error(error.response?.data || error.message);
      this.message = "An error occurred while adding exercises to the training.";
    }
  },
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
:deep(.p-steppanel) {

  border-radius: 1em;
}
</style>
