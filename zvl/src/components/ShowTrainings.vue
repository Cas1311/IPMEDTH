<template>
    <div>
        <h2>Gemaakte trainingen</h2>
        <div v-if="trainings.length === 0">
            <p>Er zijn nog geen trainingen</p>
        </div>

        <div v-else class="trainings-container">
            <TrainingCard v-for="training in trainings" :key="training.id" :training="training"
                :exercises="exercises" />
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import TrainingCard from './TrainingCard.vue';

export default {
    data() {
        return {
            trainings: [],
            exercises: [],
        };
    },
    mounted() {
        this.loadTrainings();
        this.fetchExercises();
    },
    methods: {
        loadTrainings() {
            const savedTrainings = localStorage.getItem('trainings');
            if (savedTrainings) {
                this.trainings = JSON.parse(savedTrainings);
            }
        },
        
        fetchExercises() {
            axios
                .get('http://127.0.0.1:8000/api/exercises?filter[skills]=all')
                .then((response) => {
                    this.exercises = response.data;
                })
                .catch((error) => {
                    console.error('Error fetching exercises:', error);
                });
        },
    },
    components: {
        TrainingCard, 
    },
};
</script>

<style scoped>
h2 {
    margin-bottom: 1rem;
}

.training {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
    padding: 1rem;
}

.training h3 {
    margin-bottom: 0.5rem;
}

.training ul {
    list-style: none;
    padding: 0;
}

.training li {
    margin: 0.3rem 0;
}
</style>