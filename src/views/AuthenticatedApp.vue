<template>
  <div v-if="!user" class="app-wrapper">
    <app-loading></app-loading>
  </div>
  <div v-else class="app-wrapper">
    <div v-if="canHideMenu" class="app-header">
      <button class="app-menu-btn" @click="onToggleMenu">
        <a-menu-icon></a-menu-icon>
      </button>
      <router-link class="app-logo" to="/">
        <app-logo></app-logo>
      </router-link>
    </div>
    <div class="app-container">
      <div class="app-nav" :class="{ show: isMenuOpen }">
        <main-nav
          :onLogout="logout"
          :projects="projects"
          :title="appName"
          :user="user"
        ></main-nav>
      </div>
      <div class="app-content">
        <router-view />
      </div>
    </div>
    <div
      v-if="canHideMenu"
      class="app-nav-overlay"
      :class="{ show: isMenuOpen }"
      @click="onToggleMenu"
    ></div>
  </div>
</template>

<script>
import appConfig from '@/app.config';
import AMenuIcon from '@/components/icons/AMenuIcon';
import AppLoading from '@/components/AppLoading';
import AppLogo from '@/components/AppLogo';
import MainNav from '@/components/MainNav';

export default {
  name: 'authenticated-app',
  beforeDestroy() {
    this.media.removeListener(this.onMatchMedia);
  },
  components: {
    AMenuIcon,
    AppLoading,
    AppLogo,
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
  data() {
    return {
      canHideMenu: false,
      isMenuOpen: false,
      media: undefined,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    onMatchMedia(evt) {
      // less than required width so can hide
      this.canHideMenu = !evt.matches;

      if (this.canHideMenu === false) {
        this.isMenuOpen = false;
      }
    },
    onToggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  mounted() {
    this.media = window.matchMedia('(min-width: 992px)');
    this.media.addListener(this.onMatchMedia);
    this.canHideMenu = !this.media.matches;

    this.$router.beforeEach((to, from, next) => {
      if (this.canHideMenu && this.isMenuOpen) {
        this.onToggleMenu();
      }
      next();
    });

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

.app-header {
  align-content: center;
  background-color: var(--theme1);
  border-bottom: 1px solid #eeeeee;
  display: flex;
  flex-shrink: 0;
  height: 60px;
  position: fixed;
  width: 100%;
  z-index: 1;

  .app-logo {
    align-self: center;
  }

  .app-menu-btn {
    align-items: center;
    background-color: transparent;
    border: none;
    fill: var(--text1);
    cursor: pointer;
    display: flex;
    height: 60px;
    justify-content: center;
    margin: 0 5px 0 0;
    padding: 5px;
    width: 60px;

    &:hover {
      fill: var(--primary1);
    }
  }
}

.app-container {
  display: flex;
  height: 100%;
}

.app-content {
  flex-grow: 1;
  padding: 90px 30px 30px;
  position: relative;
  z-index: 0;

  @media (min-width: 992px) {
    padding: 50px 50px 50px 330px;
  }
}

.app-nav {
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: translate3d(-100%, 0, 0);
  transition: transform 250ms ease-in-out;
  width: 280px;
  z-index: 3;

  &.show {
    transform: translate3d(0, 0, 0);
  }

  @media (min-width: 992px) {
    height: 100%;
    position: fixed;
    transform: translate3d(0, 0, 0);
  }
}

.app-nav-overlay {
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transition: opacity 250ms ease-in-out;
  width: 100%;
  z-index: 2;

  &.show {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
