<template>
    <Panel header="Filters" toggleable collapsed>

        <div class="slidercontainer">
            <label>Selecteer categorie and onderdelen</label>
            <multiselect v-model="skillValue" :options="options" :multiple="true" group-values="skill" group-label="category"
                :group-select="true" placeholder="Typ om te zoeken" track-by="name" label="name"><span
                    slot="noResult">Geen resultaten gevonden voor je zoekopdracht</span>
            </multiselect>
        </div>

        <div class="slidercontainer">
            <h3>Vanaf leeftijd</h3>
            <select v-model.number="minimumAge">
                <option value="" disabled >Selecteer leeftijd</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
            </select>
        </div>

        <div class="slidercontainer">
            <h3>Type oefening</h3>
            <select v-model.number="waterValue">
                <option value="">Alles</option>
                <option value="1">Water</option>
                <option value="0">Niet water</option>
            </select>
        </div>

        <div class="slidercontainer">
            <h3>Minimum aantal spelers</h3>
            <InputText class="durationinput" v-model.number="playerSliderValue" />
            <Slider class="slider" v-model="playerSliderValue" :min="1" :max="10" />
        </div>


        <div class="slidercontainer">
            <h3>Benodigde tijd</h3>
            <InputText class="durationinput" v-model.number="durationSliderValue[0]" />
            <InputText class="durationinput" v-model.number="durationSliderValue[1]" />
            <Slider class="slider" v-model="durationSliderValue" range :min="1" :max="60" />
        </div>

    </Panel>

</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import Slider from 'primevue/slider';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';

export default {
    data() {
        return {
            options: [],
            skillValue: [],
            durationSliderValue: [1, 60],
            playerSliderValue: '',
            minimumAge: '',
            waterValue: '',
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
    },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>\
<style scoped>
.slidercontainer {
    padding: 1em;


}

.durationinput {
    margin: 0.5em;
}

.slider{
    max-width: 80%;
}
</style>