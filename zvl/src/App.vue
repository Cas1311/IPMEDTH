<template>
  <div>
    <Menubar v-if="!isHomepage" :model="items" :class="{ hidden: isHidden }">
      <template #end>
        <!-- Add the logo with a link to the homepage -->
        <RouterLink class="link logo-container" to="/">
          <img alt="Vue logo" class="logo" src="./assets/zvllogo.png" />
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

export default {
  components: {
    Menubar,
  },
  data() {
    return {
      items: [
        { label: "Home", icon: "pi pi-home", route: "/" },
        { label: "Voeg Oefening Toe", icon: "pi pi-plus", route: "/exercise/create" },
        { label: "Trainingen", icon: "pi pi-calendar", route: "/trainings" },
        { label: "Oefeningen", icon: "pi pi-list", route: "/exercises" },
      ],
      isHidden: false,
      lastScrollPosition: 0,
    };
  },
  computed: {
    isHomepage() {
      return this.$route.path === "/" || this.$route.path === "/login";
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
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.hidden {
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
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
  height: 2.5em; /* Adjust size as needed */
  width: auto;
  object-fit: contain;
}

body {
  padding-top: 4em; /* Adjust to prevent content overlap with Menubar */
}
</style>
