<template>
  <div class="exercisecontainer">
    <div class="exercise">
      <div class="exercise-header">
        <!-- Title and duration -->
        <router-link :to="'/exercise/' + exercise.id">
          <h2 class="title">{{ exercise.name }}</h2>
        </router-link>

        <button v-if="showButton" @click="addExercise" type="button" >
          Add
        </button>

        <p class="duration"> {{ exercise.duration }} Minuten </p>
      </div>

      <!-- Categories -->
      <div>
        <ul class="categorycontainer">
          <li class="category" v-for="category in exercise.categories || []" :key="category.id">
            {{ category.name }}
          </li>
        </ul>
      </div>

      <!-- Skills -->
      <div>
        <ul>
          <li class="skill" v-for="skill in exercise.skills || []" :key="skill.id">
            {{ skill.name }}
          </li>
        </ul>
      </div>
      <p class="description" v-if="showExtra">{{ exercise.description }}</p>
    </div>
  </div>
</template>

<script>
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
      default: false, // Default to not showing extra details
    },
  },
  methods: {
    addExercise() {
      this.$emit('add-exercise', this.exercise.id);
    },
  },
};
</script>



<style scoped>
.exercisecontainer {
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

.categorycontainer {
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
}

.title {
  font-family: "Roboto Condensed";
  font-size: min(2rem, 5vw);
  font-weight: 400;
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