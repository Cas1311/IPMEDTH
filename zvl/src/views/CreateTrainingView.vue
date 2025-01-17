<template>
  <div class="card-container">
    <h2 class="title">Nieuwe training maken</h2>
    <Card class="card">
      <template #content>
        <form class="form-container" v-if="!nameSubmitted" @submit.prevent="addTraining">
          <FloatLabel>
            <InputText type="text" v-model="formData.name" class="input-field" />
            <label for="over_label">Naam van de training</label>
          </FloatLabel>

          <div v-if="errorMessage" class="error-message">
            <p>Er is al een training met deze naam.</p>
          </div>

          <Button
            type="submit"
            label="Opslaan"
            class="submit-button"
            :disabled="!formData.name"
          />
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { useTrainingStore } from "../stores/trainings";

export default {
  data() {
    return {
      formData: {
        name: "",
      },
      nameSubmitted: false,
      receivedId: "",
    };
  },

  methods: {
    ...mapActions(useTrainingStore, ["addTrainingApi"]),
    async addTraining() {
      try {
        const response = await this.addTrainingApi(this.formData);
        if (response?.data?.data?.id) {
          this.receivedId = response.data.data.id;
          this.$router.push(`/training/edit/${this.receivedId}`);
        } else {
          this.message = "Training creation failed. Please try again.";
        }
      } catch (error) {
        this.message = "An error occurred while adding the training.";
      }
    },
  },

  computed: {
    ...mapState(useTrainingStore, ["errorMessage"]),
  },

  components: {
    Button,
    InputText,
    FloatLabel,
    Card,
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.card {
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
}
.error-message {
  color: #e63946;
  font-size: 0.875rem;
  /* text-align: center; */
}
</style>
