<template>
  <div class="register-container">
    <h1>Registreer een nieuwe gebruiker</h1>
    <div class="formfields">
      <form @submit.prevent="handleRegister" class="register-form">
        <h2>Rol</h2>
        <div class="field">
          <Select v-model="formData.role" :options="roles" placeholder="Selecteer rol" class="input-field" />
          <p v-if="!formData.role" class="error-message">
            Dit veld is verplicht.
          </p>
        </div>


        <h2>Voornaam</h2>
        <div class="field">
          <InputText name="first_name" type="text" v-model="formData.first_name" class="input-field" />
          <p v-if="!formData.first_name" class="error-message">
            Dit veld is verplicht.
          </p>

        </div>


        <h2>Tweede naam (optioneel)</h2>
        <div class="field">
          <InputText name="middle_name" type="text" v-model="formData.middle_name" class="input-field" />
        </div>

        <h2>Achternaam</h2>
        <div class="field">
          <InputText name="last_name" type="text" v-model="formData.last_name" class="input-field" />
          <p v-if="!formData.last_name" class="error-message">
            Dit veld is verplicht.
          </p>
        </div>


        <h2>Email</h2>
        <div class="field">
          <InputText name="email" type="email" v-model="formData.email" class="input-field" />
          <p v-if="!formData.email" class="error-message">
            Dit veld is verplicht.
          </p>
        </div>


        <h2>Wachtwoord</h2>
        <div class="field">
          <Password name="password" :feedback="false" fluid v-model="formData.password" class="input-field" />
          <p v-if="!formData.password" class="error-message">
            Dit veld is verplicht.
          </p>
        </div>

        <h2>Bevestig Wachtwoord</h2>
        <div class="field">
          <Password name="confirmPassword" :feedback="false" fluid v-model="formData.confirmPassword"
            class="input-field" />
          <p v-if="!formData.confirmPassword" class="error-message">
            Dit veld is verplicht.
          </p>
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


<script>
import Button from "primevue/button";
import Select from "primevue/select";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { mapActions } from "pinia";
import { useAuthStore } from "../stores/auth";

export default {
  components: {
    Button,
    InputText,
    Password,
    Select
  },

  data() {
    return {
      roles: [
        'Admin', 'Trainer', 'Guest'
      ],
      errorMessage: "",
      formData:
      {
        role: "",
        disabled: false,
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }

    };
  },
  methods: {
    ...mapActions(useAuthStore, ["register"]),

    async handleRegister() {
      this.errorMessage = "";

      if (
        !this.formData.role ||
        !this.formData.first_name ||
        !this.formData.last_name ||
        !this.formData.email ||
        !this.formData.password ||
        !this.formData.confirmPassword
      ) {
        this.errorMessage = "Alle verplichte velden moeten worden ingevuld.";
        return;
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.errorMessage = "Wachtwoorden komen niet overeen!";
        return;
      }

      try {
        const credentials = {
          role: this.formData.role,
          disabled: this.formData.disabled,
          first_name: this.formData.first_name,
          last_name: this.formData.last_name,
          email: this.formData.email,
          password: this.formData.password,

        }
        await this.register(credentials);
        this.$router.push("/users");
      } catch (error) {
        this.errorMessage = "Registratie mislukt. Probeer het opnieuw.";
      }
    },
  },
};
</script>


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
  background-color: var(--theme-primary);
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