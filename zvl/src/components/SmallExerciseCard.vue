<template>
  <router-link :to="'/exercise/' + exercise.id" class="exercise-card-link" tag="div">
    <Card class="exercise-card">
      <template #title>
        <div class="cardHeader">
          <p class="exercise-name">{{ exercise.name }}</p>
          <Tag icon="pi pi-stopwatch" class="duration-tag" severity="secondary">
            <p>{{ exercise.duration }} Minuten</p>
          </Tag>
        </div>
      </template>

      <template #subtitle>
        <div class="category-container">
          <Tag class="category" v-for="category in uniqueCategories" :key="category.id">
            <p>{{ category.name }}</p>
          </Tag>
        </div>
      </template>

      <template #content>
        <div class="tags">
          <Tag class="players-tag" severity="secondary">
            <template #icon>
              <!-- Dynamically display icon based on water_exercise_location -->
              <svg v-if="waterExerciseLocationIcon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#002C53">
                <path :d="waterExerciseLocationIcon" />
              </svg>
            </template>
            <p>{{ waterExerciseLocation }}</p>
          </Tag>
          <Tag icon="pi pi-users" class="players-tag" severity="secondary">
            <p>Minimaal {{ exercise.minimum_players }} spelers</p>
          </Tag>

          <Tag icon="pi pi-user" class="players-tag" severity="secondary">
            <p>O{{ exercise.minimum_age }}</p>
          </Tag>
        </div>

        <transition name="expand">
          <div v-if="showExtra" class="content-container">
            <div class="skill-tag-container">
              <p>Onderdelen</p>
              <div class="tags">
                <!-- Additional content here -->
              </div>
            </div>
          </div>
        </transition>
      </template>

      <template #footer>
        <div v-if="showButton" class="button-container">
          <Button
            label="Toevoegen"
            icon="pi pi-plus"
            @click.stop="toggleExercise"
            :class="{ 'p-button-success': isAdded, 'p-button-secondary': !isAdded }"
            severity="secondary"
            size="large"
            class="exerciseButton"
          />
        </div>
      </template>
    </Card>
  </router-link>
</template>
<script>
import Button from "primevue/button";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Panel from "primevue/panel";


export default {
  data() {
    return {};
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
      default: false, // Default to not showing the button
    },
    selectedExerciseIds: {
      type: Array,
      default: () => [], // Default empty array if not passed
    },
    showAddButton: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    toggleExercise() {
      this.isAdded = !this.isAdded;
      this.$emit("toggle-exercise", this.exercise.id);
    },
    
  },
  computed: {
    waterExerciseLocation() {
      return this.exercise.water_exercise === 1 ? "In het water" : "Op de kant";
    },

    waterExerciseLocationIcon() {
      if (this.exercise.water_exercise === 1) {
        // icon for water exercise
        return "M80-120v-80q38 0 57-20t75-20q56 0 77 20t57 20q36 0 57-20t77-20q56 0 77 20t57 20q36 0 57-20t77-20q56 0 75 20t57 20v80q-59 0-77.5-20T748-160q-36 0-57 20t-77 20q-56 0-77-20t-57-20q-36 0-57 20t-77 20q-56 0-77-20t-57-20q-36 0-54.5 20T80-120Zm0-180v-80q38 0 57-20t75-20q56 0 77.5 20t56.5 20q36 0 57-20t77-20q56 0 77 20t57 20q36 0 57-20t77-20q56 0 75 20t57 20v80q-59 0-77.5-20T748-340q-36 0-55.5 20T614-300q-57 0-77.5-20T480-340q-38 0-56.5 20T346-300q-59 0-78.5-20T212-340q-36 0-54.5 20T80-300Zm196-204 133-133-40-40q-33-33-70-48t-91-15v-100q75 0 124 16.5t96 63.5l256 256q-17 11-33 17.5t-37 6.5q-36 0-57-20t-77-20q-56 0-77 20t-57 20q-21 0-37-6.5T276-504Zm392-336q42 0 71 29.5t29 70.5q0 42-29 71t-71 29q-42 0-71-29t-29-71q0-41 29-70.5t71-29.5Z";
      } else {
        // icon for not water exercise
        return "M360-80v-529q-91-24-145.5-100.5T160-880h80q0 83 53.5 141.5T430-680h100q30 0 56 11t47 32l181 181-56 56-158-158v478h-80v-240h-80v240h-80Zm120-640q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720Z";
      }
    },

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
  },

  components: {
    Button,
    Card,
    Tag,
    Panel,
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

.exercise-card {
  background-color: var(--theme-secondary);
  color: var(--theme-primary);
  margin: 0.25em;
  margin-bottom: 1em;
}

.cardHeader {
  display: flex;
  font-size: min(1.5rem, 4vw);
  font-weight: 400;
  justify-content: space-between;
}

.content-container {
  min-width: 100%;
  display: flex;
  flex-direction: column;
}

.p-tag {
  background-color: var(--theme-primary);
}

.duration-tag {
  background-color: var(--theme-secondary);
  padding: 0;
  font-weight: 400;
}

.tags {
  display: flex;
  gap: 0.5em;
  align-items: stretch;
  flex-wrap: wrap;
}

.divider {
  border-bottom: 0.125em solid var(--theme-primary);
  margin-bottom: 0.1em;
}

.skill-tag,
.requirement-tag {
  color: white;
  font-weight: 500;
  margin-bottom: 0.5em;
}

.players-tag {
  background-color: var(--theme-secondary);
  border: 2px solid;
  color: var(--theme-primary);
}

.category-container {
  display: flex;
  gap: 0.5em;
  border-bottom: 0.125em solid var(--theme-primary);
  margin-bottom: 0.1em;
}

.category {
  color: white;
  font-weight: 400;
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
  font-size: min(0.9rem, 4vw);
}

.p-panel {
  background-color: var(--theme-primary);
  margin-top: 0.2em;
}

.panel-container {
  display: flex;
  gap: 1em;
  align-items: flex-start;
  flex-wrap: wrap;
}

.panel-container .p-panel {
  flex: 1;
  min-width: 250px;
}

.exercise-image {
  max-width: 100%;
  max-height: 250px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.exerciseButton{
    margin-top: 1em;
    width: 100%;
    
}

@media only screen and (max-width: 768px) {
  .panel-container {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
