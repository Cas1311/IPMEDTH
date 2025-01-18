<template>
  <div class="login-container">
    <h1>Login</h1>
    <div class="formfields">
      <form @submit.prevent="handleLogin" class="login-form">
        <h2>Email</h2>
        <div class="field">
          <InputText name="username" type="text" v-model="email" class="input-field" />
        </div>

        <div class="field">
          <h2>Wachtwoord</h2>
          <Password
            name="password"
            :feedback="false"
            fluid
            v-model="password"
            class="input-field"
          />
        </div>

        <Button label="Inloggen" type="submit" class="login-button" severity="primary"/>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>


    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--theme-secondary);
  padding: 2em;
  border-radius: 0.5em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2em auto;
}

.formfields {
  background-color: #0f172a;
  padding-left: 4em;
  padding-right: 4em;
  padding-top: 1.5em;
  padding-bottom: 2.5em;
  border-radius: 0.5em;
}

h1 {
  color: var(--color-text);
}

h2 {
  color: var(--color-text);
  font-size: min(1.5em, 4.5vw);
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.field {
  margin: 1em 0;
}

.input-field {
  width: 100%;
}

.login-button {
  width: 100%;
  
  color: var(--theme-primary);
}

.error-message {
  color: var(--color-warning);
  margin-top: 0.5em;
}

.register-link {
  margin-top: 1em;
  color: var(--color-text);
}

.register-link a {
  color: var(--theme-secondary);
  text-decoration: underline;
}
</style>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { mapActions } from "pinia";
import { useAuthStore } from "../stores/auth";

export default {
  components: {
    Button,
    InputText,
    Password,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),

    
    async handleLogin() {
        
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        await this.login(credentials);
        this.$router.push("/");
      } catch (error) {
        this.errorMessage = "Onjuiste gebruikersnaam of wachtwoord";
      }
    },
  },
};
</script>
