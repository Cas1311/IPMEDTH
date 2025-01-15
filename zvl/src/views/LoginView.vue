<template>
  <div class="login-container">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <div class="form-group">
        <Button label="Login" type="submit" />
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>

    <div class="register-link">
      <p>
        Don't have an account? <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Button from "primevue/button"; // Assuming you're using PrimeVue for buttons

export default {
  components: {
    Button,
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "", // To display error message if login fails
    };
  },
  methods: {
    async handleLogin() {
      // Reset error message
      this.errorMessage = "";

      try {
        // Make the API call to authenticate the user
        // Replace this with your actual login logic
        const response = await this.$axios.post("/login", {
          username: this.username,
          password: this.password,
        });

        // Handle successful login
        if (response.data.success) {
          this.$router.push("/dashboard"); // Redirect to a different page (e.g., dashboard)
        } else {
          this.errorMessage = "Invalid credentials. Please try again.";
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = "An error occurred while logging in.";
      }
    },
  },
};
</script>
