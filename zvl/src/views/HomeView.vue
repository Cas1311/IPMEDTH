<template>
  <div class="homepage">
    <img alt="ZVL logo" class="logo" src="@/assets/zvllogo.png" />
    <h1>ZVL Waterpolo Trainingen</h1>
    <h3>Waar dromen werkelijkheid worden</h3>

    <Menu :model="filteredItems">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script>
import Menu from "primevue/menu"; // Import the Menu component from PrimeVue
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { mapState } from 'pinia';

export default defineComponent({
  components: {
    Menu,
  },
  data() {
    return {
      items: [
        {
          label: "Oefening Toevoegen",
          icon: "pi pi-plus",
          route: "/exercise/create",
          requiresAuth: true,
        },
        {
          label: "Oefeningen Overzicht",
          icon: "pi pi-list",
          route: "/exercises",
        },
        {
          label: "Training Maken",
          icon: "pi pi-plus",
          route: "/training/create",
          requiresAuth: true,
        },
        {
          label: "Trainingen Overzicht",
          icon: "pi pi-calendar",
          route: "/trainings",
        },
        {
          label: "Inloggen",
          icon: "pi pi-sign-in",
          route: "/login",
          requiresAuth: false,
        },
        {
          label: "Profiel",
          icon: "pi pi-user",
          route: "/profile",
          requiresAuth: true,
        },
        {
          label: "Gebruikers",
          icon: "pi pi-users",
          route: "/users",
          requiresAuth: true,
          requiresAdmin: true,
        },
      ],
    };
  },

  computed: {
    ...mapState(useAuthStore, ['isAuthenticated', 'role']),
    filteredItems() {
      return this.items.filter(item => {
        if (item.requiresAuth === undefined && item.requiresAdmin === undefined) {
          return true;
        }

        if (item.requiresAuth === false && this.isAuthenticated) {
          return false;
        }

        if (item.requiresAuth && !this.isAuthenticated) {
          return false;
        }

        if (item.requiresAdmin && this.role !== 'Admin') {
          return false;
        }
        return true;
      });
    }
  },
  watch: {
  }
});

</script>

<style>
.p-menu {
  width: min(80vw, 30em);
}
</style>

<style scoped>
.homepage {
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  gap: 1em;
}

.p-menu {
  width: 100%;
  max-width: 30em;
  /* Set a max-width for the menu */
}

.ml-2 {
  margin-left: 8px;
  /* Add some margin for spacing */
  text-align: left;
}

.logo {
  background-color: var(--theme-secondary);
  border-radius: 1em;
  width: min(30vw, 20em);
}

/* Responsive font sizes with clamp */
h1 {
  font-size: clamp(2rem,
      4vw,
      3.5rem);
  /* Minimum 2rem, scales with viewport, max 3.5rem */
  margin: 0 1em;
}

h3 {
  font-size: clamp(1rem,
      2vw,
      1.5rem);
  /* Minimum 1rem, scales with viewport, max 1.5rem */
  margin: 0 1em;
}
</style>
