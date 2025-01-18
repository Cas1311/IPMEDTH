<template>
    
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
        <Divider></Divider>
        <p>
            {{ user.email }}
        </p>
    </template>
        </Card>
        </div>
        

    </div>
</template>


<script>
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
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
        ...mapActions(useAuthStore, ['getAllUsers']),

    },

    computed: {
        ...mapState(useAuthStore, ['users']),
    },

    components: {
        Divider,
        Card,
        Button
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
