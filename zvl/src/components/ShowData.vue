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
  <h1>Oefeningen</h1>
  <div v-for="exercise in exercises" :key="exercise.id">
    <h2>{{ exercise.title }}</h2>
    <p>{{ exercise.description }}</p>
  </div>
</template>