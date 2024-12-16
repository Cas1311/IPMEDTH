<template>
  <img alt="Vue logo" class="logo" src="./assets/zvllogo.png" width="125" height="125" />
    <strong>Current route path:</strong> {{ $route.fullPath }}
  <nav>
    <RouterLink class="link" to="/">Go to Home</RouterLink>
    <RouterLink class="link" to="/about">Go to About</RouterLink>
    <RouterLink class="link" to="/exercises">Go to Exercises</RouterLink>
  </nav>
  
  <main>
    <RouterView />
    
  </main>
</template>

<style>
.router{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.link {
  color: var(--theme-secondary);
  text-decoration: none;
  font-size: 1.25em;
} 
</style>