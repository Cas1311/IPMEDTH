<template>
  <nav class="navBar">
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/zvllogo.png"
      width="125"
      height="125"
    />
    <RouterLink class="link" to="/">Voeg Oefening Toe</RouterLink>
    <RouterLink class="link" to="/trainings">Trainingen</RouterLink>
    <RouterLink class="link" to="/exercises">Go to Exercises</RouterLink>
  </nav>

  <main class="router">
    <RouterView />
  </main>
</template>

<style scoped>
.router {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.navBar {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1em;
  background: var(--theme-secondary);
}

.logo {
  /* border-radius: 50%; */
  border: 2px solid var(--theme-primary);
  box-shadow: 0px 0.25em 0.25em 0px rgba(0, 0, 0, 0.25);
  padding: 0.25em;
  margin: 0.5em;
  width: 3em;
  height: 3em;
}

.link {
  color: var(--theme-primary);
  text-decoration: none;
  font-size: 1.25em;
}
</style>
