<template>
  <div class="login-view">
    <LoginForm class="login-form" />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login-view {
  margin: 2em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
