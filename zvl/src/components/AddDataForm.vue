<
<template>
  <div>
    <Stepper class="stepper" value="1">
      <StepList class="steplist">
        <Step value="1">Basisinformatie</Step>
        <Step value="2">Details</Step>
        <Step value="3">Type en Beoordeling</Step>
      </StepList>
      <StepPanels class="steppanels">
        <!-- Step 1: Basisinformatie -->
        <StepPanel class="step-panel" v-slot="{ activateCallback }" value="1">
          <div class="formcontainer">
            <form @submit.prevent>
              <div>
                <h3>Naam Oefening</h3>
                <InputText id="exercisename" v-model="formData.name" />
              </div>
              <div>
                <h3>Beschrijving</h3>
                <!-- <Message
                  class="message"
                  size="small"
                  severity="secondary"
                  variant="simple"
                  >Beschrijf het doel en eventuele aandachtspunten van de oefening in
                  duidelijke en beknopte termen.</Message
                > -->
                <Textarea
                  class="bigText"
                  rows="10"
                  id="description"
                  v-model="formData.description"
                />
              </div>
            </form>
          </div>
          <div>
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="activateCallback('2')"
            />
          </div>
        </StepPanel>

        <!-- Step 2: Details -->
        <StepPanel class="step-panel" v-slot="{ activateCallback }" value="2">
          <div>
            <form @submit.prevent>
              <div>
                <h3>Procedure</h3>
                <InputText class="durationinput" v-model="formData.procedure" />
              </div>
              <div>
                <h3>Duur (minuten)</h3>
                <InputNumber
                  class="durationinput"
                  v-model="formData.duration"
                  inputId="integeronly"
                  fluid
                />
              </div>
              <div class="filter-item-container">
                <h3>Minimum aantal spelers</h3>
                <InputText class="durationinput" v-model="formData.minimum_players" />
                <Slider
                  class="slider"
                  v-model="formData.minimum_players"
                  :min="1"
                  :max="10"
                />
              </div>
            </form>
          </div>
          <div>
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="activateCallback('1')"
            />
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="activateCallback('3')"
            />
          </div>
        </StepPanel>

        <!-- Step 3: Type en Beoordeling -->
        <StepPanel v-slot="{ activateCallback }" value="3">
          <div>
            <form @submit.prevent="submitForm">
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
              <div>
                <h3>Type oefening</h3>
                <SelectButton
                  v-model="formData.water_exercise"
                  :options="waterExerciseOptions"
                  optionLabel="name"
                  optionValue="value"
                  :allowEmpty="false"
                />
              </div>
            </form>
          </div>
          <div>
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="activateCallback('2')"
            />
            <Button label="Submit" icon="pi pi-check" @click="submitForm" />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";
import Slider from "primevue/slider";
import InputText from "primevue/inputtext";
import TimeSelect from "@/components/TimeSelect.vue";
import { InputNumber } from "primevue";
import Message from "primevue/message";
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import StepPanels from "primevue/steppanels";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";
import Textarea from "primevue/textarea";

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
        const response = await this.$axios.post("/exercises", this.formData);
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
    Button,
    InputNumber,
    Message,
    Stepper,
    StepList,
    StepPanels,
    StepItem,
    Step,
    StepPanel,
    Textarea,
  },
};
</script>

<style>
.p-step-active .p-step-title {
  color: var(--theme-primary);
}

.p-step-title {
  color: var(--color-text);
}

.p-steppanel {
  border-radius: 0.4em;
}

@media (max-width: 40em) {
  .steplist{
  display: flex;
  flex-direction: column;
  align-items: start;
}
}


</style>

<style scoped>
form {
  padding: 1em;
}

.stepper {
  width: 100%;
}

.bigText {
  width: 100%;
}
.message {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

</style>
