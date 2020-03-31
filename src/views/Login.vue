<template>
  <div class="login-wrapper">
    <app-loading v-if="isLoggingIn" diameter="50px"></app-loading>
    <div v-if="!isLoggingIn" class="container">
      <div class="app-logo">
        <app-logo class="logo"></app-logo>
        <h2 class="app-name">{{ appName }}</h2>
      </div>
      <form class="form" @submit.prevent="login">
        <p v-if="message" class="error">{{ message }}</p>
        <text-input
          v-model="email"
          label="Email"
          name="email"
          type="email"
        ></text-input>
        <text-input
          v-model="password"
          label="Password"
          name="password"
          type="password"
        ></text-input>
        <a-button
          :isPrimary="true"
          style="max-width: 200px; width: 100%;"
          type="submit"
        >
          <a-check-icon></a-check-icon>
          <span style="margin: 0 0 0 5px">Login</span>
        </a-button>
      </form>
    </div>
  </div>
</template>

<script>
import appConfig from '@/app.config';
import AButton from '@/components/AButton';
import ACheckIcon from '@/components/icons/ACheckIcon';
import AppLoading from '@/components/AppLoading';
import AppLogo from '@/components/AppLogo';
import TextInput from '@/components/TextInput';

export default {
  name: 'login',
  components: {
    AButton,
    ACheckIcon,
    AppLoading,
    AppLogo,
    TextInput,
  },
  computed: {
    appName() {
      return appConfig.appName;
    },
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

.login-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
}

.container {
  align-items: center;
  background-color: var(--theme1);
  border: var(--theme4) solid 1px;
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

.app-logo {
  align-items: center;
  display: flex;
  margin: 0 0 40px;
}

.logo {
  margin: 0 10px 0 0;
}

.app-name {
  font-size: 1.2em;
  font-weight: 600;
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
