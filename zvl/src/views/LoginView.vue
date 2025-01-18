<template>
  <div class="login-container">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">email</label>
        <input
          type="text"
          id="username"
          v-model="email"
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
        Don't have an account?
        <router-link class="register-link" to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button"; // Assuming you're using PrimeVue for buttons
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { mapWritableState } from "pinia";
import { useAuthStore } from "../stores/auth";


export default {
  components: {
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "", // To display error message if login fails
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),

   
    async handleLogin() {
      // Reset error message
      this.errorMessage = "";

      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };

        const response = await this.login(credentials);

        // Handle successful login
        if (response.success) {
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

<style scoped>
.register-link{
    color: var(--text-color);
}
</style>
