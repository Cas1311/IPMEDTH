<template>
    <div class="trainingcontainer">
        <div class="training">
            <div class="training-header">
                <!-- Title and duration -->

                <!-- <router-link :to="'/exercise/' + exercise.id"> -->
                <h2 class="title">{{ training.name }}</h2>
                <!-- </router-link> -->


            </div>


            <!-- exercises -->
            <div>
                <ul>
                    <li class="exercise" v-for="exerciseId in training.exercises" :key="exerciseId">
                        <p>{{ getExerciseDetails(exerciseId)?.name }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
       
    props: {
        training: {
            type: Object,
            required: true,
        },
        exercises: {
            type: Array,
            required: true,
        },

    },
    methods: {
        getExerciseDetails(exerciseId) {
      return this.exercises.find((exercise) => exercise.id === exerciseId) || null;
    },
    },
};
</script>



<style scoped>
.trainingcontainer {
    display: flex;
    flex-direction: column;
    width: min(100%, 100ch);
    margin-inline: auto;
    margin-bottom: 2em;
}

.training {
    border-radius: 0.4em;
    background: var(--theme-secondary);
    box-shadow: 0px 0.25em 0.25em 0px rgba(0, 0, 0, 0.25);
    min-width: 100%;
    padding: 1em;
    position: relative;
}

.training-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.categorycontainer {
    display: flex;
    gap: 0.5em;
    border-bottom: 0.125em solid var(--theme-primary);
}

.exercise {
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
}

.title {
    font-family: "Roboto Condensed";
    font-size: min(2rem, 5vw);
    font-weight: 400;
}

.skill {
    word-wrap: break-word;
    overflow-wrap: break-word;
    list-style: none;
}

.description {
    margin-top: 1em;
}
</style>