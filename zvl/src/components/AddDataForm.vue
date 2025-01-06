<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Naam:</label>
        <input type="text" id="falsetitle" v-model="formData.name" />
      </div>
      <div>
        <label for="description">Beschrijving:</label>
        <textarea id="description" v-model="formData.description"></textarea>
      </div>
      <div>
        <label for="description">Procedure:</label>
        <textarea id="description" v-model="formData.procedure"></textarea>
      </div>
      <div>
        <label for="description">Duur:</label>
        <textarea id="description" v-model="formData.duration"></textarea>
      </div>
      <div>
        <label for="description">Minimum spelers:</label>
        <textarea id="description" v-model="formData.minimum_players"></textarea>
      </div>
      <div>
        <label for="description">Minimum leeftijd:</label>
        <textarea id="description" v-model="formData.minimum_age"></textarea>
      </div>
      <h3>Type oefening</h3>
      <SelectButton
        v-model="formData.water_exercise"
        :options="waterExerciseOptions"
        optionLabel="name"
        optionValue="value"
        :allowEmpty="false"
      />

      <button type="submit">Submit</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";
import SelectButton from "primevue/selectbutton";

export default {
  data() {
    return {
      formData: {
        name: "",
        description: "",
        procedure: "",
        duration: "",
        minimum_players: "",
        minimum_age: "",
        water_exercise: "",
      },
      waterExerciseOptions: [
        { name: "In het water", value: "1" },
        { name: "Niet in het water", value: "0" },
      ],
      message: "",
    };
  },

  methods: {
    async submitForm() {
      try {
        const response = await this.$axios.post(
          "/exercises",
          this.formData
        );
        this.message = response.data.message;
        this.formData.title = "";
        this.formData.description = "";
        this.formData.category = "";
      } catch (error) {
        console.error(error.response?.data || error.message);
        this.message = "An error occurred while submitting the form.";
      }
    },
  },
  components: {
    SelectButton,
  },
};
</script>
