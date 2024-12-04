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
      .get('http://localhost:8000/api/exercises')
      .then((response) => {
        this.exercises = response.data
      })
  }
}

</script>

<template>
  <h3>bruh</h3>
  <div v-for="exercise in exercises" :key="exercise.id">
    <h2>{{ exercise.title }}</h2>
    <p>{{ exercise.description }}</p>
  </div>
</template>
