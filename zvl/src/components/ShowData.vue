<script>
import axios from 'axios';

export default {
  data() {
    return {
      exercises: [], // Array to hold exercises
      loading: true, // Loading state
    };
  },
  mounted() {
    const exerciseId = this.$route.params.id;
    // Fetch exercise data
    axios
      .get('http://127.0.0.1:8000/api/exercises')
      .then((response) => {
        this.exercises = response.data; // Populate exercises array
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error);
      })
      .finally(() => {
        this.loading = false; // Stop loading
      });
  },
};
</script>

<template>
  <div class="exercisecontainer">
    <div class="exercise" v-for="exercise in exercises" :key="exercise.id">
      <div class="exercise-header">
        <router-link :to="'/exercise/' + exercise.id">
          <h2 class="title">{{ exercise.name }}</h2>
        </router-link>
        <p class="duration"> {{ exercise.duration }} Minuten </p>
      </div>
      <!-- Categories -->
      <div >
        <h3>Categories:</h3>
        <ul class="categorycontainer">
          <li class="category" v-for="category in exercise.categories" :key="category.id">
            {{ category.name }}
          </li>
        </ul>
      </div>
      <!-- Skills -->
      <div class="skillcontainer">
        <h3>Skills:</h3>
        <ul>
          <li class="category" v-for="skill in exercise.skills" :key="skill.id">
            {{ skill.name }}
          </li>
        </ul>
      </div>
      <p>{{ exercise.description }}</p>
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
  flex-direction: row;
  padding: 0.3em 0.8em;
  margin-bottom: 0.5em;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  max-width: 20em; /* temporary styling for skills */
}

.title {
  font-family: "Roboto Condensed";
  font-size: min(2rem, 5vw);
  font-weight: 400;
}

.skill {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>