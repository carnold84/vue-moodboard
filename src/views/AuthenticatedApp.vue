<template>
  <div v-if="!user" class="app-wrapper">
    <app-loading></app-loading>
  </div>
  <div v-else class="app-wrapper">
    <main-nav 
      :onLogout="logout"
      :projects="projects"
      :title="appName"
      :user="user"
    ></main-nav>
    <div class="app-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import appConfig from '@/app.config';
import AppLoading from '@/components/AppLoading';
import MainNav from '@/components/MainNav';

export default {
  name: 'authenticated-app',
  components: {
    AppLoading,
    MainNav,
  },
  computed: {
    appName() {
      return appConfig.appName;
    },
    projects() {
      return this.$store.getters['projects/projects'];
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
  height: 100%;
  position: absolute;
  width: 100%;
}

.app-content {
  flex-grow: 1;
  overflow: auto;
  padding: 50px;
}

.view-container {
  padding: 0;
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
