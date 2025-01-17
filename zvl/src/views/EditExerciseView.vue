<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AddDataForm from "@/components/AddDataForm.vue";
import axios from "axios";

const route = useRoute();
const exerciseId = route.params.id; // Get the exercise ID from the route parameter
const exerciseData = ref(null); // Holds the fetched exercise data

// Fetch the exercise data when the component is mounted
onMounted(async () => {
  try {
    const response = await axios.get(`/exercises/${exerciseId}?incl=requirements`);
    exerciseData.value = response.data;
  } catch (error) {
    console.error("Error fetching exercise data:", error);
  }
});
</script>

<template>
  <main class="addExerciseView">
    <h1>Oefening Bewerken</h1>
    <!-- Pass exerciseData to AddDataForm as a prop for pre-filling the form -->
    <AddDataForm :exercise="exerciseData" class="addDataForm" />
  </main>
</template>

<style scoped>
.addExerciseView {
  width: min(90%, 50em);
  margin: 1em auto;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--theme-secondary);
  border-radius: 0.4em;
  box-sizing: border-box;
}

h1 {
  font-size: min(8vw, 2em);
}

.addDataForm {
  width: 100%;
}
</style>
