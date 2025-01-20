<template>
  <div class="exerciseContainer">
    <div class="exercise">
      <div class="exercise-header">
        <!-- Title and duration -->
        <router-link :to="'/exercise/' + exercise.id">
          <h2 class="title">{{ exercise.name }}</h2>
        </router-link>
        <p class="duration">{{ exercise.duration }} Minuten</p>
      </div>

      <!-- Categories -->
      <ul class="categoryContainer">
        <li class="category" v-for="category in uniqueCategories" :key="category.id">
          {{ category.name }}
        </li>
      </ul>

      <!-- Skills and Requirements on the same line -->
      <div class="row">
        <!-- Skills -->
        <div class="sectionContainer column">
          <h3>Vaardigheden</h3>
          <ul class="skillContainer">
            <li class="skill" v-for="skill in exercise.skills || []" :key="skill.id">
              {{ skill.name }}
            </li>
          </ul>
        </div>

        <!-- Requirements -->
        <div class="sectionContainer column">
          <h3>Benodigdheden</h3>
          <ul class="requirementsContainer">
            <li v-for="requirement in exercise.requirements || []" :key="requirement.id" class="requirement">
              <span>{{ requirement.description }}</span>
            </li>
          </ul>
        </div>
      </div>
      <transition name="expand">
      <div class="showExtra" v-if="showExtra">
        <!-- Description and Procedure on the same line -->
        <div class="row">
          <div class="sectionContainer column">
            <h3>Beschrijving</h3>
            <p>{{ exercise.description }}</p>
          </div>

          <div class="sectionContainer column">
            <h3>Uitvoering:</h3>
            <p>{{ exercise.procedure }}</p>
          </div>
        </div>

        <!-- Age, Players, and Location on the same line -->
        <div class="row">
          <div class="sectionContainer column">
            <h3>Aangeraden Leeftijd:</h3>
            <p>O{{ exercise.minimum_age }}</p>
          </div>

          <div class="sectionContainer column">
            <h3>Minimum aantal benodigde spelers:</h3>
            <p>{{ exercise.minimum_players }}</p>
          </div>

          <div class="sectionContainer column">
            <h3>Locatie:</h3>
            <p>{{ waterExerciseLocation }}</p>
          </div>
        </div>

        <!-- Image -->
        <img v-if="showExtra" class="exerciseImage" :src="exercise.image_url" alt="Exercise Image" />
      </div>
      </transition>
      <div v-if="showButton">
      <Button v-if="!isExerciseSelected" @click="toggleExercise" type="submit" label="Toevoegen" severity="primary" size="large" class="exerciseButton"/>
      <Button v-else @click="toggleExercise" label="Verwijderen" severity="secondary" size="large" class="exerciseButton"/>
    </div>
    </div>
  </div>
</template>


<script>
import Button from "primevue/button";

export default {
  data() {
    return {

    }
  },
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
      default: false,
    },
    selectedExerciseIds: {
      type: Array,
      default: () => []  // Provide a default empty array if not passed
  },
    showAddButton: {
      type: Boolean,
      default: false,
    }

  },

  methods: {
    toggleExercise() {
      this.isAdded = !this.isAdded;
    },
    toggleExercise() {
      this.$emit("toggle-exercise", this.exercise.id);
    },
    removeExercise() {
      this.$emit("remove-exercise", this.exercise.id);
    },
  },
  computed: {
    
  isExerciseSelected() {
    return this.selectedExerciseIds.includes(this.exercise.id);
  
},

    uniqueCategories() {
      // Extract unique categories from the skills array
      if (!this.exercise.skills) return [];

      const categories = this.exercise.skills
        .map((skill) => skill.category) // Extract the category object from each skill
        .filter(
          (category, index, self) =>
            category && self.findIndex((c) => c.id === category.id) === index // Deduplicate by ID
        );

      return categories;
    },
    waterExerciseLocation() {
      return this.exercise.water_exercise === 1 ? "In het water" : "Op de kant";
    },
  },

  components: {
    Button,
  },
};
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: max-height 0.6s ease, opacity 0.6s ease;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
    max-height: 1000px;
    /* Set to a sufficiently large value */
    opacity: 1;
}

.exerciseContainer {
  display: flex;
  flex-direction: column;
  width: 90vw;
  margin-inline: auto;
  margin-bottom: 2em;
  align-items: center;
}

.exercise {
  display: flex;
  flex-direction: column;
  border-radius: 0.4em;
  background: var(--theme-secondary);
  box-shadow: 0px 0.25em 0.25em 0px rgba(0, 0, 0, 0.25);
  width: min(90vw, 70em);
  padding: 1em;
  position: relative;
  justify-content: space-between;
  /* gap: 1em; */
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
  margin-bottom: 1em;
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

.skill {
  word-wrap: break-word;
  overflow-wrap: break-word;
  list-style: none;
}

.description {
  margin-top: 1em;
}

.requirementsContainer {
  list-style: none;
}

.sectionContainer {
  background-color: var(--theme-primary);
  padding: 1em;
  border-radius: 0.6em;
}

.showExtra {
  display: flex;
  flex-direction: column;
  /* gap: 1em; */
}

.row {
  display: flex;
  gap: 1em;
  /* Space between columns */
  flex-wrap: wrap;
  /* Allow items to wrap on smaller screens */
  margin-bottom: 1.5em;
  /* Spacing between rows */
}

.column {
  flex: 1;
  /* Equal width columns */
  min-width: 15em;
  /* Minimum width for responsiveness */
}

.exerciseButton{
  min-width: 10em;
}
</style>
