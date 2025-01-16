<template>
  <div class="homepage">
    <img alt="ZVL logo" class="logo" src="@/assets/zvllogo.png" />
    <h1>ZVL Waterpolo Trainingen</h1>
    <h3>Waar dromen werkelijkheid worden</h3>

    <Menu :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
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

export default defineComponent({
  components: {
    Menu,
  },
  data() {
    return {
      items: [
        {
          label: "Voeg Oefening Toe",
          icon: "pi pi-plus",
          route: "/exercise/create",
        },
        {
          label: "Bekijk Trainingen",
          icon: "pi pi-calendar",
          route: "/trainings",
        },
        {
          label: "Bekijk Oefeningen",
          icon: "pi pi-list",
          route: "/exercises",
        },
        {
          label: "Maak Training",
          icon: "pi pi-file",
          route: "/training/create",
        },
        {
          label: "Inloggen",
          icon: "pi pi-sign-in",
          route: "/login",
        },
      ],
    };
  },
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
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1em;
}

.p-menu {
  width: 100%;
  max-width: 30em; /* Set a max-width for the menu */
}

.ml-2 {
  margin-left: 8px; /* Add some margin for spacing */
}

.logo {
  background-color: var(--theme-secondary);
  border-radius: 1em;
  width: min(30vw, 20em);
}
</style>
