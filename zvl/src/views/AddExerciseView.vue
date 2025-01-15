<script setup>
import AddDataForm from "@/components/AddDataForm.vue";
</script>

<template>
  <main class="addExerciseView">
    <h1>Voeg Oefening Toe</h1>
    <AddDataForm class="addDataForm"/>
  </main>
</template>

<style scoped>
.addExerciseView {
  width: min(90%, 50em);
  margin: 1em;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--theme-secondary);
  border-radius: 0.4em;
  box-sizing: border-box;
  
}
h1{
  font-size: min(8vw, 2em);
}
.addDataForm {
  width: 100%;
}

</style>
