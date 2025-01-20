<template>
    <Toast />
    <ConfirmPopup></ConfirmPopup>
    
    <Card>
        <template #title>{{ training.name }}</template>
        
        <template #subtitle>Gemaakt op: {{ formatDate(training.created_at) }}</template>
        
        <div></div>
        <template #content>
            <div v-if="isAuthenticated">
              <div v-if="showExtra">
                <Divider type="solid" />
          
          <router-link :to="'/training/edit/' + training.id">
            <Button icon="pi pi-file-edit" class="training-panel-button" label="Bewerken" severity="secondary" />
          </router-link>
          <Button icon="pi pi-trash" class="training-panel-button" @click="confirm($event)" label="Verwijderen"
            severity="danger" />
          </div>
            </div>
        
        </template> 
    </Card>
    
</template>


<script>
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import Card from 'primevue/card';
import { useAuthStore } from '../stores/auth';
import { mapState } from "pinia";

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

    computed:{
      ...mapState(useAuthStore, ['isAuthenticated'])
    },

    components: {
        Button,
        Divider,
        ConfirmPopup,
        Toast,
        Card
    },
};
</script>



<style scoped>

.training-panel-button {
    margin: 0.25em;
}
</style>