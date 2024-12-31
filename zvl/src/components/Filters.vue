<template>
    <div><label>Select category and skills</label>
      <multiselect v-model="value" :options="options" :multiple="true" group-values="skill" group-label="category"
        :group-select="true" placeholder="Type to search" track-by="name" label="name"><span slot="noResult">Oops! No
          elements found. Consider changing the search query.</span>
      </multiselect>
      <p>{{ value }}</p>
    </div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';

export default {
  data() {
    return {
      options: [],
      value: []
    };
  },
  mounted() {
    this.loadOptions();
  },

  watch: {
    'value': {
      handler(newValue, oldValue) {
        this.$emit('filter-changed', newValue);
      },
      deep: true
    }
  },

  methods: {
    loadOptions(){
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
    Multiselect
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>