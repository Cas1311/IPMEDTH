<template>
  <Toast />
  <ConfirmPopup />

  <div v-if="loading">
    <p>Loading...</p>
  </div>

  <div class="exercisecontainer" v-else>
    <div class="buttonContainer">
      <router-link :to="'/exercise/edit/' + exercise.id">
        <Button
          icon="pi pi-file-edit"
          class="exerciseButton"
          label="Bewerken"
          severity="secondary"
        />
      </router-link>

      <Button
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
import ShowData from "@/components/ShowData.vue";
import Button from "primevue/button";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast"; // Import useToast for programmatically adding toasts

export default {
  data() {
    return {
      exercise: null,
      loading: true,
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
        this.loading = false;
      });
  },
  methods: {
    confirmDelete(event) {
      // Confirmation popup
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
            // Deleting the exercise
            await this.$axios.delete(`/exercises/${this.exercise.id}`);

            // Show success toast
            this.$toast.add({
              severity: "success",
              summary: "Verwijderd",
              detail: "Oefening succesvol verwijderd",
              life: 3000,
            });

            // Redirect to exercises list after deletion
            this.$router.push("/exercises");
          } catch (error) {
            // Show error toast if deletion fails
            this.$toast.add({
              severity: "error",
              summary: "Fout",
              detail: "Er is een fout opgetreden bij het verwijderen van de oefening.",
              life: 3000,
            });
            console.error("Error deleting exercise:", error);
          }
        },
      });
    },
  },
  components: {
    ShowData,
    Button,
    ConfirmPopup,
    Toast,
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
