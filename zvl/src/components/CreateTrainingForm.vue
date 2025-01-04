<template>
    <div>
      <h2>Create Training</h2>
      <form @submit.prevent="saveTraining">
        <!-- Training Name Input -->
        <label for="trainingName">Training Name:</label>
        <input
          v-model="trainingName"
          id="trainingName"
          type="text"
          placeholder="Enter training name"
          required
        />
        <p>{{  selectedExerciseIds }}</p>
        <p>{{ trainings }}</p>
  
        <!-- Exercises List -->
        <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else class="exercise-list">
      <!-- Loop through exercises and display each as a ShowData card -->
      <ShowData v-for="exercise in exercises" :key="exercise.id" :exercise="exercise" :show-button="true" @add-exercise="handleAddExercise" />
    </div>
  
        
        <!-- Save Button -->
        <button type="submit">Save Training</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ShowData from '@/components/ShowData.vue';

  export default {
    data() {
      return {
        loading: true, 
        trainingName: "",
        exercises: [], // Fetched from API
        selectedExerciseIds: [], // Store selected exercise IDs
        trainings: [],
      };
    },
    mounted() {
    // Fetch all exercises from the API
    axios
      .get('http://127.0.0.1:8000/api/exercises?filter[skills]=all') // Update the URL if needed
      .then((response) => {
        this.exercises = response.data; // Populate exercises array
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error);
      })
      .finally(() => {
        this.loading = false; // Stop loading
      });

      this.loadTrainings();
  },
  methods: {

    handleAddExercise(exerciseId) {
        console.log(exerciseId)
      if (!this.selectedExerciseIds.includes(exerciseId)) {
        this.selectedExerciseIds.push(exerciseId);
      }
    },

    saveTraining() {
    if (!this.trainingName.trim()) {
      alert("Please enter a training name.");
      return;
    }
    if (this.selectedExerciseIds.length === 0) {
      alert("Please add at least one exercise.");
      return;
    }

    // Create a training object
    const newTraining = {
      id: Date.now(), // Unique ID using timestamp
      name: this.trainingName,
      exercises: [...this.selectedExerciseIds],
    };

    // Add to local trainings array
    this.trainings.push(newTraining);

    // Persist in localStorage (optional)
    localStorage.setItem('trainings', JSON.stringify(this.trainings));

    console.log('Training saved locally:', newTraining);
    alert('Training saved locally!');

    // Clear form
    this.trainingName = '';
    this.selectedExerciseIds = [];
  },

  loadTrainings() {
    const savedTrainings = localStorage.getItem('trainings');
    if (savedTrainings) {
      this.trainings = JSON.parse(savedTrainings);
    }
  }
},
    components: {
    ShowData, // Use the ShowData component
    
  },
  };

</script>