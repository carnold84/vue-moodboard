<template>
  <div class="login-wrapper">
    <a-loading v-if="isLoggingIn" diameter="50px" />
    <div v-if="!isLoggingIn" class="container">
      <div class="app-logo">
        <app-logo height="40px"></app-logo>
      </div>
      <form class="form" @submit.prevent="login">
        <p v-if="message" class="error">{{ message }}</p>
        <a-text-field
          v-model="email"
          :errors="errors.email"
          label="Email"
          name="email"
          style="margin: 0 0 15px"
          type="email"
        />
        <a-text-field
          v-model="password"
          :errors="errors.password"
          label="Password"
          name="password"
          style="margin: 0 0 15px"
          type="password"
        />
        <a-button
          :isPrimary="true"
          style="max-width: 200px; width: 100%;"
          type="submit"
        >
          <template v-slot:icon-left>
            <a-check-icon />
          </template>
          <span style="margin: 0 0 0 5px">Login</span>
        </a-button>
      </form>
    </div>
  </div>
</template>

<script>
import AButton from 'aura-design-system/src/AButton';
import ALoading from 'aura-design-system/src/ALoading';
import ACheckIcon from 'aura-design-system/src/icons/ACheckIcon';
import ATextField from 'aura-design-system/src/ATextField';

import appConfig from '@/app.config';
import AppLogo from '@/components/AppLogo';

export default {
  name: 'login',
  components: {
    AButton,
    ACheckIcon,
    ALoading,
    AppLogo,
    ATextField,
  },
  computed: {
    appName() {
      return appConfig.appName;
    },
  },
  data() {
    return {
      email: process.env.VUE_APP_DEMO_EMAIL || '',
      errors: {
        email: undefined,
        password: undefined,
      },
      isLoggingIn: false,
      message: undefined,
      password: process.env.VUE_APP_DEMO_PASSWORD || '',
    };
  },
  methods: {
    async login() {
      this.errors.email = undefined;
      this.errors.password = undefined;

      if (this.email === '' || this.password === '') {
        if (this.email === '') {
          this.errors.email = 'Name is required.';
        }

        if (this.password === '') {
          this.errors.password = 'Url is required.';
        }
        return;
      }

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
  margin: 0 0 30px;
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
