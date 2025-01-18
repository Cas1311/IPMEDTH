<template>
  <div class="register-view">
    <RegisterForm class="register-form" />
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "RegisterView",
  components: {
    RegisterForm,
  },
};
</script>

<style scoped>
.register-view {
  margin: 2em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
