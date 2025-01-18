<template>
  <div>
    <Menubar v-if="!isHomepage" :model="filteredItems" :class="{ hidden: isHidden }">
      <template #start>
        <!-- Back button for small screens -->
        <Button class="back-button" @click="goBack">
          <i class="pi pi-arrow-left"></i>Back
        </Button>
      </template>
      <template #end>
        
        <!-- Add the logo with a link to the homepage -->
        <RouterLink class="link logo-container" to="/">
          <img alt="ZVL logo" class="logo" src="./assets/zvllogo.png" />
        </RouterLink>
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
    <router-view />
  </div>
</template>

<script>
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth";

export default {
  components: {
    Menubar,
    Button,
  },
  data() {
    return {
      items: [
        // { label: "Home", icon: "pi pi-home", route: "/" },
        { label: "Oefening Toevoegen", icon: "pi pi-plus", route: "/exercise/create", requiresAuth: true,},
        { label: "Oefeningen Overzicht", icon: "pi pi-list", route: "/exercises" },
        { label: "Training Maken", icon: "pi pi-plus", route: "/training/create",  requiresAuth: true,},
        { label: "Trainingen Overzicht", icon: "pi pi-calendar", route: "/trainings" },
        {label: "Inloggen", icon: "pi pi-sign-in", route: "/login", requiresAuth: false},
        {label: "Profiel", icon: "pi pi-user", route: "/profile", requiresAuth: true,},
      ],
      isHidden: false,
      lastScrollPosition: 0,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated', 'role']),
 

    isHomepage() {
      return this.$route.path === "/";
    },
    currentPageLabel() {
      // Find the label of the current route from items
      const currentItem = this.items.find((item) => item.route === this.$route.path);
      return currentItem ? currentItem.label : "";
    },

    filteredItems() {
      return this.items.filter(item => {
        if (item.requiresAuth === undefined) return true; // No auth condition, show always
        return this.isAuthenticated ? item.requiresAuth : !item.requiresAuth;
      });
    },
  
  },
  watch: {
    $route() {
      this.resetScroll();
    },
  },
  methods: {
    resetScroll() {
      this.isHidden = false;
    },
    handleScroll() {
      const currentScroll = window.scrollY;
      if (currentScroll > this.lastScrollPosition && currentScroll > 50) {
        this.isHidden = true;
      } else {
        this.isHidden = false;
      }
      this.lastScrollPosition = currentScroll;
    },
    goBack() {
      // Navigate to the previous page
      this.$router.back();
    },

  
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
.p-menubar-button {
  color: var(--text-color) !important;
}
</style>

<style scoped>
.hidden {
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
}

.back-button {
  border: none;
  background: none;
  color: var(--text-color);
  font-size: 1em;
  cursor: pointer;
}

.menubar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: var(--theme-secondary);
  transition: transform 0.3s ease-in-out;
  display: flex;
  align-items: center;
}

.logo-container {
  margin-left: 1em;
}

.logo {
  height: 2.5em;
  width: auto;
  object-fit: contain;
}

body {
  padding-top: 4em;
}
</style>
