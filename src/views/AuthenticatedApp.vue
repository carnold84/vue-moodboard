<template>
  <div v-if="!user" class="app-wrapper">
    <app-loading></app-loading>
  </div>
  <div v-else class="app-wrapper">
    <app-header>
      <template v-slot:content-left>
        <router-link to="/">
          <app-logo height="30px" style="align-self: center; margin: 0 15px 0 0;"></app-logo>
          <h1 class="title">{{appName}}</h1>
        </router-link>
      </template>
      <template v-slot:content-center>
        <nav class="main-nav">
          <router-link class="nav-item" to="/">Home</router-link>
          <router-link class="nav-item" to="/projects">Projects</router-link>
        </nav>
      </template>
      <template v-slot:content-right>
        <a class="nav-item" @click="logout">Logout</a>
      </template>
    </app-header>
    <div class="app-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import appConfig from '@/app.config';
import AppHeader from '@/components/AppHeader';
import AppLoading from '@/components/AppLoading';
import AppLogo from '@/components/AppLogo';

export default {
  name: 'authenticatedApp',
  components: {
    AppHeader,
    AppLoading,
    AppLogo,
  },
  computed: {
    appName() {
      return appConfig.appName;
    },
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.$store.dispatch('init');
  },
};
</script>

<style scoped lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  width: 100%;
}

.app-content {
  flex-grow: 1;
  overflow: auto;
  padding: 20px 0 0;
}

.view-container {
  padding: 0 30px;
}

.title {
  font-size: 1.4em;
  font-weight: 300;
}

a {
  align-items: center;
  color: #333333;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: var(--primary1);
  }
}

.main-nav {
  display: flex;

  .nav-item {
    border-bottom: transparent solid 1px;
    color: #333333;
    font-size: 1em;
    margin: 0 20px 0 0;

    &:last-child {
      margin: 0;
    }
    
    &.router-link-exact-active {
      border-color: var(--primary1);
      color: var(--primary1);
    }
  }
}
</style>
