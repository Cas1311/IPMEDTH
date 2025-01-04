<script setup>
import CreateTrainingForm from '@/components/CreateTrainingForm.vue'
import ShowTrainings from '@/components/ShowTrainings.vue'
</script>

<template>
  <main>
    <ShowTrainings/>
    <CreateTrainingForm />
    
  </main>
  
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
