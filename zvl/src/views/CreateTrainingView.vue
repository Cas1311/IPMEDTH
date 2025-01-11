<template>
    <div class="card">
        <h2>Naam van de training</h2>
                    <Card class="nameinputcard">
                       
                        <template #title></template>
                        <template #content>
                            <form v-if="!nameSubmitted" @submit.prevent="submitForm">
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
        <ScrollPanel style="width: 100%; height: 50em">
                <ExerciseView @exercise-added="addExerciseToTraining"></ExerciseView>
            </ScrollPanel>
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
            formData:{
                name: ''
            },
            selectedExerciseIds: [],
            message:'',
            nameSubmitted: false
        }
    },


   
  methods: {
    addExerciseToTraining(exerciseId) {
    console.log('Exercise added with ID:', exerciseId);
    // Handle logic for adding exercise to the training session here
  },

    async submitForm() {
      try {
        const response = await this.$axios.post(
          "/trainings",
          this.formData
        );
        this.message = response.data.message;
        this.nameSubmitted = true
      } catch (error) {
        console.error(error.response?.data || error.message);
        this.message = "An error occurred while submitting the form.";
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
:deep(.p-steppanel){
    
    border-radius: 1em;
}
</style>
