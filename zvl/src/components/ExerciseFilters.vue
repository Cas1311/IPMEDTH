<template>
  <div class="filter-container">
    <Accordion value="0">
      <AccordionPanel class="filter-panel">
        <AccordionHeader>
          <div class="filter-header">
            <p>Filters</p>
            <Button
              @click.stop="resetFilters"
              label="Reset Filters"
              severity="secondary"
              class="reset-button-header"
            />
          </div>
        </AccordionHeader>
        <AccordionContent>
          <div class="filter-item-container">
            <h3>Categorie en onderdelen</h3>
            <TreeSelect
              
              v-model="selectedSkillIds"
              :options="options"
              selectionMode="checkbox"
              selectedItemsLabel=""
              maxSelectedLabels="5"
              fluid
              display="chip"
              placeholder="Selecteer categorie of onderdelen"
              :nodeKey="key"
            />
          </div>

          <div class="filter-item-container">
            <h3>Vanaf leeftijd</h3>
            <SelectButton
              v-model="exerciseFilters.minimumAge"
              :options="ageOptions"
              :allowEmpty="false"
            />
          </div>

          <div class="filter-item-container">
            <h3>Type oefening</h3>
            <SelectButton
              v-model="exerciseFilters.waterExercise"
              :options="waterExerciseOptions"
              optionLabel="name"
              optionValue="value"
              :allowEmpty="false"
            />
          </div>

          <div class="filter-item-container">
            <h3>Minimum aantal spelers</h3>
            <InputText
              class="durationinput"
              v-model.number="exerciseFilters.minimumPlayers"
            />
            <Slider
              class="slider"
              v-model.number="exerciseFilters.minimumPlayers"
              :min="1"
              :max="10"
            />
          </div>

          <div class="filter-item-container">
            <h3>Benodigde tijd</h3>
            <InputText
              class="durationinput"
              v-model.number="exerciseFilters.durationSliderValue[0]"
            />
            <InputText
              class="durationinput"
              v-model.number="exerciseFilters.durationSliderValue[1]"
            />
            <Slider
              class="slider"
              v-model="exerciseFilters.durationSliderValue"
              range
              :min="1"
              :max="60"
            />
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script>
import TreeSelect from "primevue/treeselect";
import Multiselect from "primevue/multiselect";
import Slider from "primevue/slider";
import InputText from "primevue/inputtext";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import { mapActions } from "pinia";
import { mapWritableState } from "pinia";
import { useExerciseStore } from "../stores/exercises";
import { useFilterOptionStore } from "../stores/filteroptions";

export default {
  data() {
    return {
      selectedSkillIds: [],
      //options: [],
      durationSliderValue: [1, 60],
      waterExerciseOptions: [
        { name: "Alles", value: "" },
        { name: "In het water", value: 1 },
        { name: "Niet in het water", value: 0 },
      ],
      ageOptions: [8, 10, 12, 14, 16, 18],
    };
  },
  mounted() {
    this.loadOptionsFromApi();
    this.exerciseFilters.skillValue = [];
  },

  watch: {
    selectedSkillIds(newValue) {
      // Sync with exerciseFilters
      this.exerciseFilters.skillValue = newValue;
      
      this.fetchExercisesFromApi();
    },
  },

  methods: {
    ...mapActions(useExerciseStore, ["setExerciseFilters", "fetchExercisesFromApi"]),
    ...mapActions(useFilterOptionStore, ["loadOptionsFromApi"]),

    resetFilters() {
      this.exerciseFilters = {
        skillValue: [],
        minimumAge: 18,
        waterExercise: "",
        minimumPlayers: null,
        durationSliderValue: [1, 60],
      };
      this.selectedSkillIds = [];
      
    },
  },
  computed: {
    ...mapWritableState(useExerciseStore, ["exerciseFilters"]),
    ...mapWritableState(useFilterOptionStore, ["options"]),
  },

  components: {
    Slider,
    InputText,
    SelectButton,
    Button,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    TreeSelect,
    
  },
};
</script>

<style scoped>
.filter-panel {
  margin: 1em 0;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}

.reset-button-header {
  margin-left: 1em;
}

.filter-item-container {
  padding: 1em;
}

.durationinput {
  margin: 0.5em;
}

.slider {
  max-width: 80%;
}
</style>
