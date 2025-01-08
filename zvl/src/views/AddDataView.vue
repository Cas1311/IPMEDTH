<script setup>
import AddDataForm from '@/components/AddDataForm.vue'

</script>

<template>
  <main class="addDataView">
    <h1>Voeg Oefening Toe</h1>
    <AddDataForm />
    
  </main>
  
</template>

<style>
  .addDataView {
    margin: 1em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--theme-secondary);
    border-radius: 0.4em;
    width: fit-content;
  }
</style>
