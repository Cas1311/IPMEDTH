<template>
    <div>
        <h1>Exercise Detail</h1>
        
        <div v-if="exercise">
            <div class="exercisecontainer">
                <div class="exercise">
                    <h2>{{ exercise.name }}</h2>
                    <p>{{ exercise.description }}</p>
                    <!-- Categories -->
                    <div class="categorycontainer">
                        <h3>Categories:</h3>
                        <ul>
                            <li v-for="category in exercise.categories" :key="category.id">
                                {{ category.name }}
                            </li>
                        </ul>
                    </div>
                    <!-- Skills -->
                    <div class="skillcontainer">
                        <h3>Skills:</h3>
                        <ul>
                            <li v-for="skill in exercise.skills" :key="skill.id">
                                {{ skill.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            exercise: null, // Store exercise data
        };
    },
    mounted() {
        const exerciseId = this.$route.params.id; // Get exercise ID from route params

        // Fetch the exercise details using the ID
        axios
            .get(`https://zvl-trainingen.wptraining.info/api/exercises/${exerciseId}`)
            .then((response) => {
                this.exercise = response.data; // Store the fetched data in `exercise`
            })
            .catch((error) => {
                console.error('Error fetching exercise data:', error);
            });
    },
};
</script>

<style scoped>
.exercisecontainer {
    display: flex;
    flex-direction: column;
    width: min(100%, 100ch);
    margin-inline: auto;
    gap: 0.75em;
}

.exercise {
    border-radius: 0.4em;
    background: var(--theme-secondary);
    box-shadow: 0px 0.25em 0.25em 0px rgba(0, 0, 0, 0.25);
    min-width: 100%;
    padding: 1em;
    position: relative;
}
</style>