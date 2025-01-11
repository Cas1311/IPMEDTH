<template>
  <div class="exerciseContainer">
    <div class="exercise">
      <div class="exercise-header">
        <!-- Title and duration -->
        <router-link :to="'/exercise/' + exercise.id">
          <h2 class="title">{{ exercise.name }}</h2>
        </router-link>
        <p class="duration"> {{ exercise.duration }} Minuten </p>
      </div>

      <!-- Categories -->
      <div>
        <ul class="categoryContainer">
          <li class="category" v-for="category in exercise.categories || []" :key="category.id">
            {{ category.name }}
          </li>
        </ul>
      </div>

      <img v-if="showExtra" class="exerciseImage" :src="exercise.image_url" alt="Exercise Image" />

      <!-- Skills -->
      <div>
        <ul class="skillContainer">
          <li class="skill" v-for="skill in exercise.skills || []" :key="skill.id">
            {{ skill.name }}
          </li>
        </ul>
      </div>
      <div v-if="showExtra">
        <p class="description">{{ exercise.description }}</p>
        <p>min age: {{ exercise.minimum_age }}</p>
        <p>max age: {{ exercise.maximum_age }}</p>
        <p>min players: {{ exercise.minimum_players }}</p>
        <p>water: {{ exercise.water_exercise }}</p>
        <p>procedure: {{ exercise.procedure }}</p>
        

      </div>
      <Button v-if="showButton" @click="addExercise" type="submit" label="Toevoegen" />
      
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button' 


export default {
  props: {
    exercise: {
      type: Object,
      required: true,
    },
    showExtra: {
      type: Boolean,
      default: false, // Default to not showing extra details
    },
    showButton: {
      type: Boolean,
      default: true,
    }
  },

  methods: {
    addExercise() {
      this.$emit('add-exercise', this.exercise.id);
    },
  },

  components: {
        Button,
  
    },
};
</script>



<style scoped>
.exerciseContainer {
  display: flex;
  flex-direction: column;
  width: min(100%, 100ch);
  margin-inline: auto;
  margin-bottom: 2em;
}

.exercise {
  border-radius: 0.4em;
  background: var(--theme-secondary);
  box-shadow: 0px 0.25em 0.25em 0px rgba(0, 0, 0, 0.25);
  min-width: 100%;
  padding: 1em;
  position: relative;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exerciseImage {
  width: 100%;
  height: auto;
  padding: 1em 0;
  border-radius: 0.4em;
}

.categoryContainer {
  display: flex;
  gap: 0.5em;
  border-bottom: 0.125em solid var(--theme-primary);
  
}

.category {
  font-size: 0.8rem;
  border-radius: 0.5em;
  background: var(--theme-primary);
  box-shadow: 0px 0.125em 0.25em 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  padding: 0.3em 0.8em;
  margin-bottom: 0.5em;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  max-width: 20em;
  font-size: min(1rem, 4vw);
}

.title {
  font-size: min(2rem, 5vw);
  font-weight: 400;
}



.skillContainer {
  padding-top: 0.5em;
  /* margin-top: 1em; */
  border-top: 0.125em solid var(--theme-primary);
}

.skill {
  word-wrap: break-word;
  overflow-wrap: break-word;
  list-style: none;
}

.description {
  margin-top: 1em;
}
</style>