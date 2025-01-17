<template>
    <div class="filter-container">
        <Accordion value="0">
            <AccordionPanel class="filter-panel">
                <AccordionHeader>
                    <div class="filter-header">
                        <p>Filters</p>
                        <Button @click.stop="resetFilters" label="Reset Filters" severity="secondary"
                            class="reset-button-header" />
                    </div>
                </AccordionHeader>
                <AccordionContent>

                    <div class="filter-item-container">
                        <h3>Categorie en onderdelen</h3>
                        <TreeSelect filter filterMode="lenient" v-model="selectedSkillIds" :options="options"
                            selectionMode="checkbox" selectedItemsLabel="" maxSelectedLabels="5" fluid display="chip" placeholder="Selecteer categorie of onderdelen" :nodeKey="key" />

                    </div>

                    <div class="filter-item-container">
                        <h3>Vanaf leeftijd</h3>
                        <SelectButton v-model="exerciseFilters.minimumAge" :options="ageOptions" :allowEmpty="false" />


                    </div>

                    <div class="filter-item-container">
                        <h3>Type oefening</h3>
                        <SelectButton v-model="exerciseFilters.waterExercise" :options="waterExerciseOptions"
                            optionLabel="name" optionValue="value" :allowEmpty="false" />



                    </div>

                    <div class="filter-item-container">
                        <h3>Minimum aantal spelers</h3>
                        <InputText class="durationinput" v-model.number="exerciseFilters.minimumPlayers" />
                        <Slider class="slider" v-model.number="exerciseFilters.minimumPlayers" :min="1" :max="10" />
                    </div>


                    <div class="filter-item-container">
                        <h3>Benodigde tijd</h3>
                        <InputText class="durationinput" v-model.number="exerciseFilters.durationSliderValue[0]" />
                        <InputText class="durationinput" v-model.number="exerciseFilters.durationSliderValue[1]" />
                        <Slider class="slider" v-model="exerciseFilters.durationSliderValue" range :min="1" :max="60" />
                    </div>


                </AccordionContent>

            </AccordionPanel>
        </Accordion>
    </div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import TreeSelect from 'primevue/treeselect';
import Slider from 'primevue/slider';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { mapWritableState } from 'pinia';
import { useExerciseStore } from '../stores/exercises';


export default {


    data() {
        return {
            selectedSkillIds: [],
            options: [],

            // skillValue: [],
            durationSliderValue: [1, 60],
            // playerSliderValue: '',
            // minimumAge: '',
            // waterExercise: '',
            waterExerciseOptions: [{ name: 'Alles', value: '' }, { name: 'In het water', value: 1 }, { name: 'Niet in het water', value: 0 }],
            ageOptions: [8, 10, 12, 14, 16, 18],

        };
    },
    mounted() {
        this.loadOptions();
        this.exerciseFilters.skillValue = [];
    },

    watch: {
        selectedSkillIds(newValue) {
            // Sync with exerciseFilters
            this.exerciseFilters.skillValue = newValue;
            console.log('Updated skill values:', this.exerciseFilters.skillValue);
            this.fetchExercisesFromApi();
        },
        // 'exerciseFilters.skillValue': {
        //     handler(newValue, oldValue) {
        //         // Emit only if the value actually changes
        //         if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        //             this.$emit('skill-filter-changed', newValue);
        //             console.log('Skill filter changed, this message is from watcher:', JSON.stringify(newValue, null, 2));
        //             console.log('Skill filter changed, this message is from watcher, this is state:', this.exerciseFilters.skillValue);
        //             this.fetchExercisesFromApi();
        //         }
        //     },
        //     deep: true
        // }
    },


    methods: {

        ...mapActions(useExerciseStore, ['setExerciseFilters', 'fetchExercisesFromApi']),
        loadOptions() {
            Promise.all([
                this.$axios.get('/skills'),
                this.$axios.get('/categories')
            ])
                .then(([skillsResponse, categoriesResponse]) => {
                    const skills = skillsResponse.data;
                    const categories = categoriesResponse.data;

                    // Group skills under their respective categories and add unique keys
                    this.options = categories.map(category => ({
                        key: `${category.id}`, // Unique key for the category
                        label: category.name, // Label for the category
                        children: skills
                            .filter(skill => skill.category_id === category.id)
                            .map(skill => ({
                                key: `${category.id}-${skill.id}`, // Combine category ID and skill ID
                                label: skill.name, // Label for each skill
                                data: skill.id // Additional data field for skill
                            }))
                    }));
                })
                .catch(error => {
                    console.error('Error fetching skills or categories:', error);
                });
        },




        resetFilters() {

            this.exerciseFilters = {
                skillValue: [],
                minimumAge: 18,
                waterExercise: '',
                minimumPlayers: null,
                durationSliderValue: [1, 60]
            };
            this.selectedSkillIds = [];
            this.fetchExercisesFromApi();
        },

    },
    computed: {
        ...mapWritableState(useExerciseStore, ['exerciseFilters']),

    },

    components: {
        Multiselect,
        Slider,
        InputText,
        SelectButton,
        Button,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        TreeSelect
    },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>\
<style scoped>
.filter-panel {

    margin: 1em;
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