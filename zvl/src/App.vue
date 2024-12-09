<template>
  <img alt="Vue logo" class="logo" src="./assets/zvllogo.png" width="125" height="125" />
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
    <RouterLink to="/exercise">Go to Exercises</RouterLink>
  </nav>
  <main>
    <RouterView />
    
  </main>
</template>