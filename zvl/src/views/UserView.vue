<template>
    <Toast />
    <ConfirmPopup></ConfirmPopup>
    <div class="profile-container">
        <h1>Alle gebruikers</h1>
        <router-link :to="'/register'">
            <Button>Nieuwe gebruiker</Button>
        </router-link>
        
        <div class="user-card-container">
            <Card v-for="user in users" class="user-card">
            <template #title>{{user.first_name}} {{user.middle_name}} {{user.last_name}}</template>
            <template #subtitle>
                {{ user.role }}
            </template>
    <template #content>
        
        <p>
            {{ user.email }}
        </p>
        <Divider></Divider>
    </template>

    <template #footer>
        <Button label="Gebruiker verwijderen" icon="pi pi-trash"  @click="confirm($event, user.id)" severity="danger"></Button>
    </template>
        </Card>
        </div>
        

    </div>
</template>


<script>
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import { useAuthStore } from "@/stores/auth";
import { mapActions } from 'pinia'
import { mapState } from 'pinia'

export default {
    data() {
        return {
            loading: false,
        };
    },
    async mounted() {

        this.getAllUsers();
    },


    methods: {
        ...mapActions(useAuthStore, ['getAllUsers', 'deleteUser']),

        confirm(event, userId) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Weet je zeker dat je de gebruiker wilt verwijderen?',
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
          this.$toast.add({ severity: 'secondary', summary: 'Verwijderd', detail: 'Gebruiker verwijderd', life: 3000 });
          this.deleteUser(userId)
          .then(() => {
            this.getAllUsers(); // Refresh user list after deletion
          })
          this.$router.push('/users');
        },

      });
    },

    },

    computed: {
        ...mapState(useAuthStore, ['users']),
    },

    components: {
        Divider,
        Card,
        Button,
        ConfirmPopup,
        Toast,
    },
};
</script>



<style scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.user-card-container {
    display: flex;
    flex-direction: column;
    gap: 1rem; 
    width: 100%;
    max-width: 80vw; 
    margin: 0.5em;
}

.user-card {
    width: 100%; 
    max-width: 80vw; 
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}



</style>
