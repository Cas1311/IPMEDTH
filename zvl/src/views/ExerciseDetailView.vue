<template>
  <div>
    <!-- <h1>Exercise Detail</h1> -->

    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div class="exercisecontainer" v-else>
      <!-- Display a single ShowData card -->
      <ShowData :exercise="exercise" :show-extra="true" />
    </div>
  </div>
</template>

<script>
import ShowData from "@/components/ShowData.vue";

export default {
  data() {
    return {
      exercise: null, // Holds the specific exercise
      loading: true, // Loading state
    };
  },
  mounted() {
    const exerciseId = this.$route.params.id; // Get exercise ID from the route params

    // Fetch the specific exercise from the API
    this.$axios
      .get(`/exercises/${exerciseId}?incl=requirements,skills,category`) // Update the URL if needed
      .then((response) => {
        this.exercise = response.data; // Store the fetched exercise
      })
      .catch((error) => {
        console.error("Error fetching exercise:", error);
      })
      .finally(() => {
        this.loading = false; // Stop loading
      });
  },
  components: {
    ShowData, // Use the ShowData component
  },
};
</script>

<style scoped>
.exercisecontainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-inline: auto;
  gap: 0.75em;
  margin-top: 1em;
}
</style>
