<template>
    <Toast />
    <ConfirmPopup></ConfirmPopup>
    <div class="profile-container">
        <div v-if="loading">
            <ProgressSpinner />
        </div>

        <div v-if="userInfo">
            <Card  class="user-card">
            <template #title>
                <div class="avatar-container">
                    <Avatar class="icon-avatar" icon="pi pi-user" size="xlarge" shape="circle" />
                </div>
                <p class="user-name">{{ userInfo.first_name }} {{ userInfo.middle_name }} {{ userInfo.last_name }}</p>
            </template>

            <template #subtitle>
                <p class="user-role">{{ userInfo.role }}</p>
            </template>


            <template #content>
                <Divider />
                <p class="user-email">{{ userInfo.email }}</p>
            </template>


        </Card>
        <Button icon="pi pi-sign-out" class="logout-button" @click="confirm($event)" label="Uitloggen"
            severity="secondary" />
        </div>

        <div v-else>
            <Card  class="user-card-signedout" >
            <template #title>
                Je bent niet ingelogd.
            </template>
            
            <template #footer>
                <router-link :to="'/login' ">
            <Button icon="pi pi-sign-in" class="signin-button" label="Inloggen" severity="primary" />
          </router-link>
            </template>


        </Card>
        
        </div>

    </div>
</template>


<script>
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import ConfirmPopup from 'primevue/confirmpopup';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
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
        try {

            this.loading = true;
            await this.getInfo();

        } catch (error) {
            console.error('Error fetching user info:', error);
        } finally {
            this.loading = false;
        }
    },


    methods: {
        ...mapActions(useAuthStore, ['getInfo', 'logout']),

        confirm(event) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Weet je zeker dat je uit wilt loggen?',
                rejectProps: {
                    label: 'Ingelogd blijven',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Uitloggen',
                    severity: 'danger'
                },
                accept: () => {
                    this.$toast.add({ severity: 'secondary', summary: 'Uitgelogd', detail: 'Je bent uitgelogd', life: 3000 });
                    this.logout();
                    this.$router.push('/');
                },

            });
        },

    },

    computed: {
        ...mapState(useAuthStore, ['userInfo']),
    },

    components: {
        Button,
        Divider,
        ConfirmPopup,
        Toast,
        Card,
        Avatar,
        ProgressSpinner
    },
};
</script>



<style scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    

}

.user-card {
    
    width: 100%;
    max-width: 500px;
    background-color: var(--theme-secondary);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
}

.user-card-signedout {
    width: 100%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    
}


.avatar-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.icon-avatar {
    background-color: var(--theme-primary);
    color: var(--theme-secondary);
}

.user-name {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-top: 1rem;
}


.user-role {
    font-size: 1.5rem;
    color: var(--theme-primary);
    text-align: center;

}


.user-email {
    font-size: 1.3rem;
    color: var(--theme-primary);
    text-align: center;
}

.logout-button {
    margin: 1em;
    
    
}

.signin-button{
    margin: 1em;
    
}
</style>
