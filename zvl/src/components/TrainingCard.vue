<template>
  <Accordion :value="['0']" multiple>
    <AccordionPanel>
    <AccordionHeader class="title">{{ training.name }}</AccordionHeader>
    <AccordionContent  v-for="exercise in training.exercises || []" :key="exercise.id">{{ exercise.name }}</AccordionContent>
    
  </AccordionPanel>
  </Accordion>
</template>

<script>
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

export default {
  props: {
    training: {
      type: Object,
      required: true,
    },
    exercise: {
      type: Object,
      required: false,
    },
    showExtra: {
      type: Boolean,
      default: false, // Default to not showing extra details
    },
  },

  components: {
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent
  },
};
</script>



<style scoped>
.exerciseContainer {
  display: flex;
  flex-direction: column;
  width: min(100%, 100ch);
  margin-inline: auto;
  margin-bottom: 2em;
}

.exercise {
  border-radius: 0.4em;
  background: var(--theme-secondary);
  box-shadow: 0px 0.25em 0.25em 0px rgba(0, 0, 0, 0.25);
  min-width: 100%;
  padding: 1em;
  position: relative;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exerciseImage {
  width: 100%;
  height: auto;
  padding: 1em 0;
  border-radius: 0.4em;
}

.categoryContainer {
  display: flex;
  gap: 0.5em;
  border-bottom: 0.125em solid var(--theme-primary);

}

.category {
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
  font-size: min(1rem, 4vw);
}

.title {
  font-size: min(2rem, 5vw);
  font-weight: 400;
}



.p-accordionpanel {
  padding-top: 0.5em;
  /* margin-top: 1em; */
  border-top: 0.125em solid var(--theme-primary);
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