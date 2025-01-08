<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <h3>Naam Oefening</h3>
        <InputText id="exercisename" v-model="formData.name" />
      </div>
      <div>
        <h3>Beschrijving</h3>
        <InputText id="description" v-model="formData.description" />
      </div>
      <div>
        <h3>Procedure</h3>
        <InputText class="durationinput" v-model="formData.procedure" />
      </div>
      <div>
        <h3>Duur</h3>
        <InputText class="durationinput" v-model="formData.duration" />
      </div>
      <div>
        <TimeSelect/>
      </div>
      <div class="filter-item-container">
        <h3>Minimum aantal spelers</h3>
        <InputText class="durationinput" v-model="formData.minimum_players" />
        <Slider class="slider" v-model="formData.minimum_players" :min="1" :max="10" />
      </div>
      <div class="filter-item-container">
        <h3>Vanaf leeftijd</h3>
        <SelectButton
          v-model="formData.minimum_age"
          :options="ageOptions"
          optionLabel="name"
          optionValue="value"
          :allowEmpty="false"
        />
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
import Slider from "primevue/slider";
import InputText from "primevue/inputtext";
import TimeSelect from "@/components/TimeSelect.vue";

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
      ageOptions: [
        { name: "O8", value: "8" },
        { name: "O10", value: "10" },
        { name: "O12", value: "12" },
        { name: "O14", value: "14" },
        { name: "O16", value: "16" },
        { name: "O18", value: "18" },
      ],
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
        this.formData.name = "";
        this.formData.description = "";
        this.formData.procedure = "";
        this.formData.duration = "";
        this.formData.minimum_players = "";
        this.formData.minimum_age = "";
        this.formData.water_exercise = "";
      } catch (error) {
        console.error(error.response?.data || error.message);
        this.message = "An error occurred while submitting the form.";
      }
    },
  },
  components: {
    SelectButton,
    Slider,
    InputText,
    TimeSelect,
  },
};
</script>

<style scoped>
.durationinput {
  margin: 0.5em 0;
}

.slider {
  max-width: 80%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
