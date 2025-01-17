<
<template>
  <div>
    <Stepper class="stepper" value="1">
      <StepList class="steplist">
        <Step value="1">Basisinformatie</Step>
        <Step value="2">Details</Step>
        <Step value="3">Vaardigheden</Step>
      </StepList>
      <StepPanels class="steppanels">
        <!-- Step 1: Basisinformatie -->
        <StepPanel class="step-panel" v-slot="{ activateCallback }" value="1">
          <div class="formcontainer">
            <form @submit.prevent>
              <div>
                <h3>Naam Oefening</h3>
                <InputText
                  class="exercisename"
                  v-model="formData.name"
                  :class="{ 'error-input': showErrors.step1 && !formData.name }"
                />
                <p v-if="showErrors.step1 && !formData.name" class="error-message">
                  Dit veld is verplicht.
                </p>
              </div>
              <div>
                <h3>Beschrijving</h3>
                <Message
                  class="message"
                  size="small"
                  severity="secondary"
                  variant="simple"
                  >Beschrijf het doel en eventuele aandachtspunten van de oefening in
                  duidelijke en beknopte termen.</Message
                >
                <Textarea
                  class="bigText"
                  rows="10"
                  id="description"
                  v-model="formData.description"
                  :class="{ 'error-input': showErrors.step1 && !formData.description }"
                />
                <p v-if="showErrors.step1 && !formData.description" class="error-message">
                  Dit veld is verplicht.
                </p>
              </div>
            </form>
          </div>
          <div class="button-container">
            <Button
              label="Volgende"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="handleNextStep(activateCallback, 1)"
            />
          </div>
        </StepPanel>

        <!-- Step 2: Details -->
        <StepPanel class="step-panel" v-slot="{ activateCallback }" value="2">
          <div>
            <form @submit.prevent>
              <div>
                <h3>Uitvoering</h3>
                <Message
                  class="message"
                  size="small"
                  severity="secondary"
                  variant="simple"
                  >Beschrijf hoe de oefening uitgevoerd moet worden</Message
                >

                <Textarea
                  class="bigText"
                  rows="10"
                  id="description"
                  v-model="formData.procedure"
                  :class="{ 'error-input': showErrors.step2 && !formData.procedure }"
                />
                <p v-if="showErrors.step2 && !formData.procedure" class="error-message">
                  Dit veld is verplicht.
                </p>
              </div>
              <div>
                <h3>Duur (minuten)</h3>
                <InputNumber
                  showButtons="true"
                  buttonLayout="vertical"
                  :min="0"
                  :max="180"
                  :step="5"
                  class="durationinput"
                  v-model="formData.duration"
                  :class="{ 'error-input': showErrors.step2 && !formData.duration }"
                  inputId="integeronly"
                  fluid
                  ><template #incrementbuttonicon><h3>+5</h3></template>
                  <template #decrementbuttonicon> <h3>-5</h3></template></InputNumber
                >
                <p v-if="showErrors.step2 && !formData.duration" class="error-message">
                  Dit veld is verplicht.
                </p>
              </div>
              <div class="filter-item-container">
                <h3>Minimum aantal spelers</h3>
                <InputNumber
                  class="durationinput"
                  v-model="formData.minimum_players"
                  :class="{ 'error-input': showErrors.step2 && !formData.procedure }"
                  :min="1"
                />
                <Slider
                  class="slider"
                  v-model="formData.minimum_players"
                  :min="1"
                  :max="20"
                />
                <p
                  v-if="showErrors.step2 && !formData.minimum_players"
                  class="error-message"
                >
                  Dit veld is verplicht.
                </p>
              </div>
              <div class="filter-item-container">
                <h3>Vanaf leeftijd</h3>
                <SelectButton
                  v-model="formData.minimum_age"
                  :options="ageOptions"
                  optionLabel="name"
                  optionValue="value"
                  :allowEmpty="false"
                  :class="{ 'error-input': showErrors.step2 && !formData.procedure }"
                />
                <p v-if="showErrors.step2 && !formData.minimum_age" class="error-message">
                  Dit veld is verplicht.
                </p>
              </div>
              <div>
                <h3>Type oefening</h3>
                <SelectButton
                  v-model="formData.water_exercise"
                  :options="waterExerciseOptions"
                  optionLabel="name"
                  optionValue="value"
                  :allowEmpty="false"
                  :class="{ 'error-input': showErrors.step2 && !formData.procedure }"
                />
                <p
                  v-if="showErrors.step2 && !formData.water_exercise"
                  class="error-message"
                >
                  Dit veld is verplicht.
                </p>
              </div>
              <div class="filter-item-container">
                <h3>Benodigdheden</h3>
                <ul class="requirements-list">
                  <li
                    class="requirement-line"
                    v-for="(requirement, index) in formData.requirements"
                    :key="index"
                  >
                    <InputText
                      class="requirement-input"
                      v-model="formData.requirements[index].description"
                      placeholder="Voer benodigdheid in"
                    />
                    <Button
                      icon="pi pi-times"
                      severity="danger"
                      aria-label="Cancel"
                      @click="removeRequirement(index)"
                      >x</Button
                    >
                  </li>
                </ul>
                <Button
                  label="Voeg benodigdheid toe"
                  icon="pi pi-plus"
                  class="addButton"
                  @click="addRequirement"
                />
              </div>
            </form>
          </div>
          <div class="button-container">
            <Button
              label="Terug"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="activateCallback('1')"
            />
            <Button
              label="Volgende"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="handleNextStep(activateCallback, 2)"
            />
          </div>
        </StepPanel>

        <!-- Step 3: Type en Beoordeling -->
        <StepPanel v-slot="{ activateCallback }" value="3">
          <div>
            <form @submit.prevent="submitForm">
              <div class="filter-item-container">
                <h3>Welke vaardigheden worden getraind?</h3>
                <TreeSelect
                  class="treeselect"
                  filter
                  filterMode="lenient"
                  v-model="formData.skills"
                  :options="options"
                  selectionMode="checkbox"
                  selectedItemsLabel=""
                  maxSelectedLabels="5"
                  display="chip"
                  placeholder="Selecteer vaardigheden"
                  :nodeKey="'key'"
                  :class="{
                    'error-input': showErrors.step3 && formData.skills.length === 0,
                  }"
                />
                <p
                  v-if="showErrors.step3 && formData.skills.length === 0"
                  class="error-message"
                >
                  Dit veld is verplicht.
                </p>
              </div>
            </form>
          </div>

          <div class="button-container">
            <Button
              label="Terug"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="activateCallback('2')"
            />
            <Button label="Opslaan" icon="pi pi-check" @click="submitForm" />
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
import Multiselect from "vue-multiselect";
import TreeSelect from "primevue/treeselect";

export default {
  props: {
    // Accept the exercise object as a prop for editing
    exercise: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formData: {
        name: "",
        description: "",
        procedure: "",
        duration: "",
        minimum_players: 1,
        minimum_age: "",
        water_exercise: "",
        equipment: "",
        skills: [],
        requirements: [],
      },
      showErrors: {
        step1: false,
        step2: false,
        step3: false,
      },
      options: [],
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
  watch: {
    // Watch the prop exercise for changes to pre-fill the form data
    exercise: {
      immediate: true,
      handler(newExercise) {
        if (newExercise) {
          this.formData = {
            name: newExercise.name || "",
            description: newExercise.description || "",
            procedure: newExercise.procedure || "",
            duration: newExercise.duration || "",
            minimum_players: newExercise.minimum_players || 1,
            minimum_age: newExercise.minimum_age || "",
            water_exercise: newExercise.water_exercise || "",
            equipment: newExercise.equipment || "",
            skills: newExercise.skills || [],
            requirements: newExercise.requirements || [],
          };
        }
      },
    },
  },
  mounted() {
    this.loadOptions();
  },
  methods: {
    async submitForm() {
      try {
        const payload = {
          ...this.formData,
          skills: [], // Leave skills empty for now
          requirements: [],
        };

        let response;
        if (this.exercise) {
          // If there's an exercise prop, it's an edit, so use PUT
          response = await this.$axios.put(`/exercises/${this.exercise.id}`, payload);
        } else {
          // Otherwise, it's a create, so use POST
          response = await this.$axios.post("/exercises", payload);
        }

        console.log("Response data:", response);
        const exerciseId = response.data.data.id;

        // Navigate to the exercise page using the exercise ID
        this.$router.push(`/exercise/${exerciseId}`);

        // Handle linking skills and requirements as needed

        this.message = "Oefening succesvol opgeslagen";
        this.resetForm();
      } catch (error) {
        console.error("Error:", error);
        this.message = "Er is iets mis gegaan.";
      }
    },
    resetForm() {
      this.formData = {
        name: "",
        description: "",
        procedure: "",
        duration: "",
        minimum_players: 1,
        minimum_age: "",
        water_exercise: "",
        equipment: "",
        skills: [],
        requirements: [],
      };
    },
    loadOptions() {
      Promise.all([this.$axios.get("/skills"), this.$axios.get("/categories")])
        .then(([skillsResponse, categoriesResponse]) => {
          const skills = skillsResponse.data;
          const categories = categoriesResponse.data;
          this.options = categories.map((category) => ({
            key: `${category.id}`,
            label: category.name,
            children: skills
              .filter((skill) => skill.category_id === category.id)
              .map((skill) => ({
                key: `${category.id}-${skill.id}`,
                label: skill.name,
                data: skill.id,
              })),
          }));
        })
        .catch((error) => {
          console.error("Error loading skills or categories:", error);
        });
    },
    validateFields(requiredFields) {
      return requiredFields.every((field) => {
        const value = this.formData[field];
        return (
          value !== null && value !== "" && !(Array.isArray(value) && value.length === 0)
        );
      });
    },
    handleNextStep(activateCallback, step) {
      const requiredFields = {
        1: ["name", "description"],
        2: ["procedure", "duration", "minimum_players", "minimum_age", "water_exercise"],
        3: ["skills"],
      }[step];

      if (this.validateFields(requiredFields)) {
        this.showErrors[`step${step}`] = false;
        activateCallback(`${step + 1}`);
      } else {
        this.showErrors[`step${step}`] = true;
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
    Multiselect,
    TreeSelect,
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style>
.p-step-active .p-step-title {
  color: var(--theme-primary) !important;
}

.p-step-title {
  font-size: min(1.5em, 5vw);
  color: var(--color-text) !important;
}

.p-steppanel {
  border-radius: 0.4em;
}
.p-slider {
  width: 100%;
}

.p-button-danger {
  background-color: var(--color-warning) !important;
  color: white !important;
  font-size: 1rem !important;
}

.durationinput {
  width: 100%;
}

@media (max-width: 25em) {
  .p-selectbutton {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
.p-selectbutton {
  width: 100%;
  font-size: min(1.5em, 5vw);
}

@media (max-width: 40em) {
  .steplist {
    display: flex;
    flex-direction: column;
    align-items: start !important;
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
.exercisename {
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: end;
  gap: 1em;
  padding: 1em;
}

h3 {
  font-size: min(1.5em, 5vw);
}

.error-input {
  border: 1px solid red;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 0.25em;
}

.requirement-input {
  width: 100%;
}

.requirements-list {
  list-style: none;
}

.requirement-line {
  display: flex;
  gap: 1em;
  align-items: center;
  margin: 1vh 0;
}

.addButton {
  width: fit-content;
  font-size: min(1em, 4vw);
  margin-top: 1.5em;
}

.treeselect {
  width: 100%;
}
</style>
