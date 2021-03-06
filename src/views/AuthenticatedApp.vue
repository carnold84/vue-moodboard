<template>
  <div v-if="!user" class="app-wrapper">
    <a-loading />
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
          :projects="isLoading ? null : projects"
          :title="appName"
          :user="user"
        ></main-nav>
      </div>
      <div class="app-content">
        <transition name="view">
          <router-view :key="$route.path" />
        </transition>
      </div>
    </div>
    <div
      v-if="canHideMenu"
      class="app-nav-overlay"
      :class="{ show: isMenuOpen }"
      @click="onToggleMenu"
    ></div>
    <modal-manager />
    <toast-manager />
  </div>
</template>

<script>
import ALoading from 'aura-design-system/src/ALoading';
import AMenuIcon from 'aura-design-system/src/icons/AMenuIcon';

import appConfig from '@/app.config';
import AppLogo from '@/components/AppLogo';
import MainNav from '@/containers/MainNav';
import ModalManager from '@/containers/ModalManager';
import ToastManager from '@/containers/ToastManager';

export default {
  name: 'authenticated-app',
  beforeDestroy() {
    this.media.removeListener(this.onMatchMedia);
  },
  components: {
    ALoading,
    AMenuIcon,
    AppLogo,
    MainNav,
    ModalManager,
    ToastManager,
  },
  computed: {
    appName() {
      return appConfig.appName;
    },
    projects() {
      return this.$store.getters['projects/list'];
    },
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  data() {
    return {
      canHideMenu: false,
      isLoading: true,
      isMenuOpen: false,
      media: undefined,
    };
  },
  methods: {
    async loadProjects() {
      this.isLoading = true;
      await this.$store.dispatch('projects/load');
      this.isLoading = false;
    },
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

    this.loadProjects();
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
    display: flex;
    left: 50%;
    margin: 0 0 0 -43px;
    position: absolute;
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
  overflow: auto;
  position: relative;
  z-index: 0;
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
    position: relative;
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

.view-enter-active {
  opacity: 1;
  transition: opacity 300ms;
}

.view-leave-active {
  opacity: 1;
  transition: opacity 300ms;
}

.view-enter {
  opacity: 0;
}

.view-leave-to {
  opacity: 0;
}

/* .view-enter-active {
  transform: translate3d(0, 0, 0);
  transition: transform 500ms;
}

.view-leave-active {
  transform: translate3d(0, 0, 0);
  transition: transform 500ms;
}

.view-enter {
  transform: translate3d(-100%, 0, 0);
}

.view-leave-to {
  transform: translate3d(100%, 0, 0);
} */
</style>
