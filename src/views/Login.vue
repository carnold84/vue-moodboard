<template>
  <div class="view-wrapper">
    <div v-if="authStatus !== 'loading'" class="container">
      <form class="form" @submit.prevent="login">
        <app-logo style="margin: 0 0 40px;"></app-logo>
        <text-input v-model="email" label="Email" name="email" type="email"></text-input>
        <text-input v-model="password" label="Password" name="email" type="password"></text-input>
        <app-button :isPrimary="true" style="max-width: 200px; width: 100%;" type="submit">Login</app-button>
      </form>
    </div>
    <app-loading v-if="authStatus === 'loading'" diameter="50px"></app-loading>
  </div>
</template>

<script>
import AppButton from "../components/AppButton";
import AppLoading from "../components/AppLoading";
import AppLogo from "../components/AppLogo";
import TextInput from "../components/TextInput";

export default {
  name: "login",
  components: {
    AppButton,
    AppLoading,
    AppLogo,
    TextInput
  },
  computed: {
    authStatus: function() {
      return this.$store.getters.authStatus;
    },
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.error(err));
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/breakpoints.scss";

.container {
  align-items: center;
  background-color: var(--theme1);
  border: var(--theme3) solid 1px;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  padding: 30px;
  width: 100%;

  @media ($breakpoint__tablet) {
    margin: 0;
    max-width: 600px;
    padding: 40px 45px;
  }
}

.form {
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
}
</style>
