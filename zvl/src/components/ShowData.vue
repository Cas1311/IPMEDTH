<script>

import axios from 'axios'

export default {
  data() {
    return {
      exercises: []
    }
  },
  mounted() {
    axios
      .get('https://zvl-trainingen.wptraining.info/api/exercises')
      .then((response) => {
        this.exercises = response.data
      })
  }
}

</script>

<template>
  <div class="exercisecontainer">
    <h1>Oefeningen</h1>
    <div class="exercise" v-for="exercise in exercises" :key="exercise.id">
      <div class="exercise-header">
        <h2 class="title">{{ exercise.title }}</h2>
        <p class="duration">5 Minuten</p>
      </div>
      <div class="categorycontainer">
        <p class="category">Warming Up</p>
        <p class="category">Cooling Down</p>
      </div>
      <p class="skill">{{ exercise.description }}</p>
      <p class="skill">{{ exercise.description }}</p>
      <p class="skill">{{ exercise.description }}</p>
    </div>
  </div>
</template>

<style scoped>

.exercisecontainer {
  display: flex;
  flex-direction: column;
  width: min(100%, 100ch);
  margin-inline: auto;
  gap: 0.75em;
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
  padding: 0.3em 0.8em;
  margin-bottom: 0.5em;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

}

.title {
  color: #FFF;
  font-family: "Roboto Condensed";
  font-size: 2rem;
  font-weight: 400;
}

.skill{
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>