<template>
    <div class="filter-container">
        <Accordion  value="0">
            <AccordionPanel class="filter-panel">
                <AccordionHeader>Filters</AccordionHeader>
                    <AccordionContent>

            <div class="filter-item-container">
                <h3>Selecteer categorie of onderdelen</h3>
                <multiselect v-model="exerciseStore.exerciseFilters.skillValue" :options="options" :multiple="true" group-values="skill"
                    group-label="category" :group-select="true" placeholder="Typ om te zoeken" track-by="name"
                    label="name"><span slot="noResult">Geen resultaten gevonden voor je zoekopdracht</span>
                </multiselect>
            </div>

            <div class="filter-item-container">
                <h3>Vanaf leeftijd</h3>
                <SelectButton v-model="exerciseStore.exerciseFilters.minimumAge" :options="ageOptions" :allowEmpty="false" />
                

            </div>

            <div class="filter-item-container">
                <h3>Type oefening</h3>
                <SelectButton v-model="exerciseStore.exerciseFilters.waterExercise" :options="waterExerciseOptions" optionLabel="name" optionValue="value" :allowEmpty="false" />

          
               
            </div>

            <div class="filter-item-container">
                <h3>Minimum aantal spelers</h3>
                <InputText class="durationinput" v-model.number="exerciseStore.exerciseFilters.minimumPlayers" />
                <Slider class="slider" v-model.number="exerciseStore.exerciseFilters.minimumPlayers" :min="1" :max="10" />
            </div>


            <div class="filter-item-container">
                <h3>Benodigde tijd</h3>
                <InputText class="durationinput" v-model.number="exerciseStore.exerciseFilters.durationSliderValue[0]" />
                <InputText class="durationinput" v-model.number="exerciseStore.exerciseFilters.durationSliderValue[1]" />
                <Slider class="slider" v-model="exerciseStore.exerciseFilters.durationSliderValue" range :min="1" :max="60" />
            </div>

            
        </AccordionContent>
        
        </AccordionPanel>
        </Accordion>
    </div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
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

    setup(){
        const exerciseStore = useExerciseStore()
        return { exerciseStore };
    },
    
    data() {
        return {
            options: [],
            
            // skillValue: [],
            durationSliderValue: [1, 60],
            // playerSliderValue: '',
            // minimumAge: '',
            // waterExercise: '',
            waterExerciseOptions: [{ name: 'Alles', value:''}, { name: 'In het water', value: 1 }, { name: 'Niet in het water', value: 0 }],
            ageOptions: [8, 10, 12, 14, 16, 18]

        };
    },
    mounted() {
        this.loadOptions();
    },

    watch:{
        'exerciseStore.exerciseFilters.skillValue':  {
            handler(newValue) {
                this.$emit('skill-filter-changed', newValue);
            },
            deep: true
        },
        
    },

    methods: {
        
        loadOptions() {
            Promise.all([
                this.$axios
                    .get('/skills'),
                this.$axios
                    .get('/categories')
            ])
                .then(([skillsResponse, categoriesResponse]) => {
                    const skills = skillsResponse.data;
                    const categories = categoriesResponse.data;

                    // Group skills under their respective categories
                    this.options = categories.map(category => ({
                        category: category.name,
                        skill: skills
                            .filter(skill => skill.category_id === category.id)
                            .map(skill => ({
                                id: skill.id,
                                name: skill.name
                            }))
                    }));
                })
                .catch(error => {
                    console.error('Error fetching skills or categories:', error);
                });
        },

        

    },
    computed: {
        // ...mapWritableState(useExerciseStore, ['exerciseFilters']),
        
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
        AccordionContent
    },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>\
<style scoped>

.filter-panel {

    margin: 1em;
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