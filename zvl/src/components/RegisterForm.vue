<template>
  <div class="register-container">
    <h1>Registreer</h1>
    <div class="formfields">
      <form @submit.prevent="handleRegister" class="register-form">
        <h2>Gebruikersnaam</h2>
        <div class="field">
          <InputText name="username" type="text" v-model="username" class="input-field" />
        </div>

        <!-- Email kan toegoevoegd worden indien nodig -->
        <!-- <h2>Email</h2>
        <div class="field">
          <InputText name="email" type="email" v-model="email" class="input-field" />
        </div> -->

        <h2>Wachtwoord</h2>
        <div class="field">
          <Password
            name="password"
            :feedback="false"
            fluid
            v-model="password"
            class="input-field"
          />
        </div>

        <h2>Bevestig Wachtwoord</h2>
        <div class="field">
          <Password
            name="confirmPassword"
            :feedback="false"
            fluid
            v-model="confirmPassword"
            class="input-field"
          />
        </div>

        <Button label="Registreren" type="submit" class="register-button" />

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>

      <div class="login-link">
        <p>
          Heb je al een account?
          <router-link class="login-link" to="/login">Log hier in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
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
  background-color: var(--p-stepper-steppanel-background);
  padding: 1em;
  border-radius: 0.5em;
}

h1 {
  color: var(--color-text);
}

h2 {
  color: var(--color-text);
  font-size: min(1.5em, 4.5vw);
}

.register-form {
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

.register-button {
  width: 100%;
  background-color: var(--theme-secondary);
  color: var(--color-text);
}

.error-message {
  color: var(--color-warning);
  margin-top: 0.5em;
}

.login-link {
  margin-top: 1em;
  color: var(--color-text);
}

.login-link a {
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
      username: "",
    //   email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["register"]),
    async handleRegister() {
      this.errorMessage = "";

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Wachtwoorden komen niet overeen!";
        return;
      }

      try {
        await this.register({
          username: this.username,
        //   email: this.email,
          password: this.password,
        });
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage = "Registratie mislukt. Probeer het opnieuw.";
      }
    },
  },
};
</script>
