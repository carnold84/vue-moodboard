<template>
  <div class="view-wrapper">
    <div v-if="authStatus !== 'loading'" class="container">
      <form class="form" @submit.prevent="login">
        <app-logo style="margin: 0 0 40px;"></app-logo>
        <p v-if="authStatus === 'error'" class="error">Email and password did not match.</p>
        <text-input v-model="email" label="Email" name="email" type="email"></text-input>
        <text-input v-model="password" label="Password" name="password" type="password"></text-input>
        <app-button
          :isPrimary="true"
          style="max-width: 200px; width: 100%;"
          inputType="submit"
        >Login</app-button>
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
      return this.$store.getters["auth/status"];
    },
    isLoggedIn: function() {
      return this.$store.getters["auth/isLoggedIn"];
    }
  },
  data() {
    return {
      email: "chrisarnold@gmail.com",
      password: "123456"
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("auth/login", { email, password })
        .then(() => {
          console.log('logged in')
          this.$router.push("/");
        })
        .catch(() => {
          console.error('Login failed');
        });
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

.error {
  background-color: #ffe4e2;
  border: 1px solid #ffc9c5;
  border-radius: 3px;
  margin: 0 0 10px;
  padding: 5px 10px;
  width: 100%;
}
</style>
