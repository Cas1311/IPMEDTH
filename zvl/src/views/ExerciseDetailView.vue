<template>
  <Toast />
  <ConfirmPopup />

  <div v-if="loadingExercise">
    <p>Loading...</p>
  </div>

  <div class="exercisecontainer" v-else>
    <div class="buttonContainer">
      <router-link :to="'/exercise/edit/' + exercise.id">
        <Button
          v-if="authStore.isAuthenticated"
          icon="pi pi-file-edit"
          class="exerciseButton"
          label="Bewerken"
          severity="secondary"
        />
      </router-link>

      <Button
        v-if="authStore.isAuthenticated"
        icon="pi pi-trash"
        class="exerciseButton"
        @click="confirmDelete($event)"
        label="Verwijderen"
        severity="danger"
      />
    </div>

    <ShowData :exercise="exercise" :show-extra="true" />
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import ShowData from "@/components/ShowData.vue";
import Button from "primevue/button";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast"; // Import useToast for programmatically adding toasts

export default {
  components: {
    ShowData,
    Button,
    ConfirmPopup,
    Toast,
  },
  data() {
    return {
      exercise: null,
      loadingExercise: true,
      authStore: useAuthStore(),
    };
  },
  mounted() {
    const exerciseId = this.$route.params.id;
    this.$axios
      .get(`/exercises/${exerciseId}?incl=requirements,skills,category`)
      .then((response) => {
        this.exercise = response.data;
      })
      .catch((error) => {
        console.error("Error fetching exercise:", error);
      })
      .finally(() => {
        this.loadingExercise = false;
      });
  },
  methods: {
    confirmDelete(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Weet je zeker dat je de oefening wilt verwijderen?",
        rejectProps: {
          label: "Annuleren",
          severity: "secondary",
          outlined: true,
        },
        acceptProps: {
          label: "Verwijderen",
          severity: "danger",
        },
        accept: async () => {
          try {
            await this.$axios.delete(`/exercises/${this.exercise.id}`);
            this.$toast.add({
              severity: "success",
              summary: "Verwijderd",
              detail: "Oefening succesvol verwijderd",
              life: 3000,
            });
            this.$router.push("/exercises");
          } catch (error) {
            this.$toast.add({
              severity: "error",
              summary: "Fout",
              detail: "Er is een fout opgetreden bij het verwijderen van de oefening",
              life: 3000,
            });
          }
        },
      });
    },
  },
};
</script>

<style scoped>
.exercisecontainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-inline: auto;
  gap: 0.75em;
  margin-top: 1em;
}

.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.exerciseButton {
  width: 40vw;
  height: 100%;
}
</style>
