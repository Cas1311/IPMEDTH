<template>
    <Toast />
    <ConfirmPopup></ConfirmPopup>
    
    <Card>
        <template #title>{{ training.name }}</template>
        
        <template #subtitle>Gemaakt op: {{ formatDate(training.created_at) }}</template>
        
        <template #content>
        <Divider type="solid" />
          
          <router-link :to="'/training/edit/' + training.id">
            <Button icon="pi pi-file-edit" class="training-panel-button" label="Training bewerken" severity="secondary" />
          </router-link>
          <Button icon="pi pi-trash" class="training-panel-button" @click="confirm($event)" label="Training verwijderen"
            severity="danger" />
        </template> 
    </Card>
    
</template>


<script>
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import Card from 'primevue/card';

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

    methods: {
        formatDate(isoDate) {
            const date = new Date(isoDate);
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-GB', options); // For dd/mm/yyyy
            const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // 24-hour time
            return `${formattedDate} ${formattedTime}`;
        },
        
        confirm(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Weet je zeker dat je de training wilt verwijderen?',
        rejectProps: {
          label: 'Annuleren',
          severity: 'secondary',
          outlined: true
        },
        acceptProps: {
          label: 'Verwijderen',
          severity: 'danger'
        },
        accept: () => {
          this.$toast.add({ severity: 'secondary', summary: 'Verwijderd', detail: 'Training verwijderd', life: 3000 });
          this.$emit("delete-training", this.training.id);
          this.$router.push('/trainings');
        },

      });
    },
    },

    components: {
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        Button,
        Divider,
        ConfirmPopup,
        Toast,
        Card
    },
};
</script>



<style scoped>
.exercise-container {
    display: flex;
    flex-direction: column;
    width: min(100%);
    margin-inline: auto;
    margin-bottom: 2em;
}

.exercise {
    border-radius: 0.4em;
    background: var(--theme-secondary);
    box-shadow: 0px 0.25em 0.25em 0px rgba(0, 0, 0, 0.25);
    min-width: 100%;
    padding: 1em;
    margin-bottom: 0.2em;
    margin-top: 0.2em;
    position: relative;
}

.exercise-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    /* Remove default link styling */
    color: inherit;
    /* Ensure the text color matches the rest */
}

.exercise-name {
    color: var(--theme-primary);
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


.training-panel-button {
    margin: 0.25em;
}
</style>