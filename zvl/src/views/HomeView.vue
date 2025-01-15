<template>
  <div class="homepage">
    <h1>ZVL Waterpolo Trainingen</h1>

    <div class="button-container">
      <!-- Button to Add Exercise -->
      <router-link class="router-link" to="/exercise/create">
        <Button label="Voeg Oefening Toe"  class="p-button" />
      </router-link>

      <!-- Button to View Trainings -->
      <router-link class="router-link" to="/trainings">
        <Button label="Bekijk Trainingen"  class="p-button" />
      </router-link>

      <!-- Button to View Exercises -->
      <router-link class="router-link" to="/exercises">
        <Button label="Bekijk Oefeningen"  class="p-button" />
      </router-link>

      <!-- Button to Create Training -->
      <router-link class="router-link" to="/training/create">
        <Button label="Maak Training" class="p-button" />
      </router-link>

      <router-link class="router-link" to="/login">
        <Button label="Inloggen" class="p-button" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  components: {
    Button,
  },
};
</script>

<style scoped>
.homepage {
  text-align: center;
  height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.button-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 100em;
}

.p-button {
  width: 100%;
}

.router-link{
  width: 30%;
}
</style>
