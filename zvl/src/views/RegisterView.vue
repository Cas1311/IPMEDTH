<template>
  <div class="register-container">
    <h2>Register</h2>

    <form @submit.prevent="handleRegister">
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
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
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
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Confirm your password"
          required
        />
      </div>

      <div class="form-group">
        <Button label="Register" icon="pi pi-check" type="submit" />
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>

    <div class="login-link">
      <p>Already have an account? <router-link class="login-link" to="/login">Login here</router-link></p>
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
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "", // To display error message if registration fails
    };
  },
  methods: {
    async handleRegister() {
      // Reset error message
      this.errorMessage = "";

      // Basic validation to check if passwords match
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return;
      }

      try {
        // Make the API call to register the user
        // Replace this with your actual registration logic
        const response = await this.$axios.post("/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        // Handle successful registration
        if (response.data.success) {
          this.$router.push("/login"); // Redirect to login page after successful registration
        } else {
          this.errorMessage = "Registration failed. Please try again.";
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = "An error occurred while registering.";
      }
    },
  },
};
</script>

<style scoped>
.login-link {
  color: var(--text-color);
}
</style>
