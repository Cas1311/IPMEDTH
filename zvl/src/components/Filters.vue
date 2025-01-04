<template>
    <div class="filter-container">
        <Panel class="filter-panel" header="Filters" toggleable collapsed>


            <div class="filter-item-container">
                <h3>Selecteer categorie of onderdelen</h3>
                <multiselect v-model="skillValue" :options="options" :multiple="true" group-values="skill"
                    group-label="category" :group-select="true" placeholder="Typ om te zoeken" track-by="name"
                    label="name"><span slot="noResult">Geen resultaten gevonden voor je zoekopdracht</span>
                </multiselect>
            </div>

            <div class="filter-item-container">
                <h3>Vanaf leeftijd</h3>
                <SelectButton v-model="minimumAge" :options="ageOptions" :allowEmpty="false" />
                

            </div>

            <div class="filter-item-container">
                <h3>Type oefening</h3>
                <SelectButton v-model="waterValue" :options="waterExerciseOptions" optionLabel="name" optionValue="value" :allowEmpty="false" />

          
               
            </div>

            <div class="filter-item-container">
                <h3>Minimum aantal spelers</h3>
                <InputText class="durationinput" v-model.number="playerSliderValue" />
                <Slider class="slider" v-model="playerSliderValue" :min="1" :max="10" />
            </div>


            <div class="filter-item-container">
                <h3>Benodigde tijd</h3>
                <InputText class="durationinput" v-model.number="durationSliderValue[0]" />
                <InputText class="durationinput" v-model.number="durationSliderValue[1]" />
                <Slider class="slider" v-model="durationSliderValue" range :min="1" :max="60" />
            </div>

        </Panel>
    </div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import Slider from 'primevue/slider';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import SelectButton from 'primevue/selectbutton';

export default {
    data() {
        return {
            options: [],
            skillValue: [],
            durationSliderValue: [1, 60],
            playerSliderValue: '',
            minimumAge: '',
            waterValue: '',
            waterExerciseOptions: [{ name: 'Alles', value:''}, { name: 'In het water', value: 1 }, { name: 'Niet in het water', value: 0 }],
            ageOptions: [8, 10, 12, 14, 16, 18]

        };
    },
    mounted() {
        this.loadOptions();
    },

    watch: {
        skillValue: {
            handler(newValue) {
                this.$emit('skill-filter-changed', newValue);
            },
            deep: true
        },
        durationSliderValue: {
            handler(newValue) {
                this.$emit('duration-slider-changed', newValue);
            },
            deep: true
        },
        playerSliderValue: {
            handler(newValue) {
                this.$emit('player-slider-changed', newValue);
            },
            deep: true
        },
        minimumAge: {
            handler(newValue) {
                this.$emit('age-changed', newValue);
            },
            deep: true
        },
        waterValue: {
            handler(newValue) {
                this.$emit('water-changed', newValue);
            },
            deep: true
        }
    },




    methods: {
        loadOptions() {
            Promise.all([
                axios
                    .get('http://127.0.0.1:8000/api/skills'),
                axios
                    .get('http://127.0.0.1:8000/api/categories')
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

    components: {
        Multiselect,
        Slider,
        InputText,
        Panel,
        SelectButton,
    },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>\
<style scoped>
.filter-container {}

.filter-panel {

    margin: 1em;
}

.p-panel {
    background-color: var(--theme-primary);
    border-color: var(--theme-secondary);
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

:deep(.p-selectbutton.p-component){
   
}

:deep(.p-selectbutton.p-togglebutton){
    
   
}


:deep(.p-togglebutton.p-component) {
   
}

:deep(.p-togglebutton.p-component.p-togglebutton-checked) {
    
    
}

:deep(.p-togglebutton.p-component.p-togglebutton-checked::before) {
   
   
}

</style>