<template>
  <div class="view-wrapper">
    <app-loading v-if="isLoggingIn" diameter="50px"></app-loading>
    <div v-if="!isLoggingIn" class="container">
      <form class="form" @submit.prevent="login">
        <app-logo style="margin: 0 0 40px;"></app-logo>
        <p v-if="message" class="error">{{message}}</p>
        <text-input v-model="email" label="Email" name="email" type="email"></text-input>
        <text-input v-model="password" label="Password" name="password" type="password"></text-input>
        <app-button :isPrimary="true" style="max-width: 200px; width: 100%;" type="submit">Login</app-button>
      </form>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppLoading from '@/components/AppLoading';
import AppLogo from '@/components/AppLogo';
import TextInput from '@/components/TextInput';

export default {
  name: 'login',
  components: {
    AppButton,
    AppLoading,
    AppLogo,
    TextInput,
  },
  data() {
    return {
      email: 'chrisarnold.nz@gmail.com',
      isLoggingIn: false,
      message: undefined,
      password: '12345',
    };
  },
  methods: {
    async login() {
      const data = {
        email: this.email,
        password: this.password,
      };

      this.isLoggingIn = true;

      const response = await this.$store.dispatch('auth/login', data);

      if (response.success) {
        this.$router.push('/');
      } else {
        this.isLoggingIn = false;
        this.message = response.message;
        console.error(response.message);
      }
    },
  },
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
