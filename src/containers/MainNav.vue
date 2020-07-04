<template>
  <nav class="wrapper">
    <div class="header">
      <router-link class="logo-link" to="/">
        <app-logo
          height="30px"
          style="align-self: center; margin: 0 10px 0 0;"
        ></app-logo>
      </router-link>
    </div>
    <a-menu>
      <li>
        <router-link to="/">
          <a-menu-item>Home</a-menu-item>
        </router-link>
      </li>
      <li>
        <a-menu-item component="div" :is-sub-menu-title="true">
          Projects
          <template v-slot:content-right>
            <a-button class="add-btn" @click="onCreateProject">
              <a-add-icon></a-add-icon>
            </a-button>
          </template>
        </a-menu-item>
        <div v-if="!projects">
          <a-loading diameter="30px" />
        </div>
        <a-message-panel
          v-if="projects && projects.length === 0"
          text="No Projects"
        />
        <a-menu v-if="projects">
          <li v-for="project in projects" :key="project.id">
            <router-link :to="{ name: 'project', params: { id: project.id } }">
              <a-menu-item component="div" :is-sub-menu="true">
                {{ project.name }}
              </a-menu-item>
            </router-link>
          </li>
        </a-menu>
      </li>
      <li>
        <router-link to="/images">
          <a-menu-item>All Images</a-menu-item>
        </router-link>
      </li>
      <li>
        <router-link to="/links">
          <a-menu-item>All Links</a-menu-item>
        </router-link>
      </li>
    </a-menu>
    <div class="user">
      <div class="user-info">
        <h4 class="user-name">{{ user.name }}</h4>
        <p class="user-email">{{ user.email }}</p>
      </div>
      <a-button @click="logout">
        <template v-slot:icon-left>
          <a-logout-icon />
        </template>
        <span>Logout</span>
      </a-button>
    </div>
  </nav>
</template>

<script>
import AButton from 'aura-design-system/src/AButton';
import ALoading from 'aura-design-system/src/ALoading';
import AAddIcon from 'aura-design-system/src/icons/AAddIcon';
import ALogoutIcon from 'aura-design-system/src/icons/ALogoutIcon';
import AMenu from 'aura-design-system/src/AMenu';
import AMenuItem from 'aura-design-system/src/AMenuItem';

import AppLogo from '@/components/AppLogo';
import { MODAL_TYPES } from '@/containers/ModalManager';

export default {
  name: 'main-nav',
  components: {
    AAddIcon,
    AButton,
    ALoading,
    ALogoutIcon,
    AMenu,
    AMenuItem,
    AppLogo,
  },
  methods: {
    logout() {
      this.onLogout();
    },
    onCreateProject() {
      this.$store.dispatch('modals/add', {
        title: 'Add Project',
        type: MODAL_TYPES.ADD_PROJECT,
      });
    },
  },
  props: {
    onLogout: {
      type: Function,
    },
    projects: {
      type: Array,
    },
    title: {
      default: 'Moodboard',
      type: String,
    },
    user: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  align-content: center;
  background-color: #ffffff;
  border-right: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  width: 280px;
}

.header {
  border-bottom: 1px solid #eeeeee;
  padding: 25px 30px;
}

.logo-link {
  align-items: center;
  display: flex;
  text-decoration: none;
}

.title {
  color: var(--text1);
  font-size: 1em;
  font-weight: 700;
}

.user {
  border-top: 1px solid #eeeeee;
  bottom: 0;
  display: flex;
  padding: 20px 24px 20px 30px;
  position: fixed;
  width: calc(100% - 1px);
}

.user-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.user-name {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0 0 5px;
}

.user-email {
  font-size: 1em;
}

.user-logout-btn {
  align-items: center;
  color: var(--text1);
  cursor: pointer;
  fill: var(--text1);
  font-size: 1em;
  background-color: transparent;
  border: none;
  display: flex;

  &:hover {
    color: var(--primary1);
    fill: var(--primary1);
  }
}

.nav-item {
  align-items: center;
  background-color: #ffffff;
  border: none;
  border-bottom: 1px solid #eeeeee;
  color: var(--text1);
  font-family: var(--fontFamily--secondary);
  font-size: 1em;
  font-weight: 600;
  display: flex;
  padding: 16px 26px;
  width: 100%;

  &.btn {
    border-left: 4px solid transparent;
    color: var(--text1);
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: var(--primary1);
    }

    &.router-link-exact-active {
      border-left-color: var(--primary1);
      color: var(--primary1);
    }
  }
}

.sub-nav {
  align-items: flex-start;
  cursor: default;
  display: flex;
  flex-direction: column;
  padding: 0;

  .nav-item {
    border-bottom: none;
  }

  .sub-nav-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .add-btn {
    height: auto;
    margin: 2px 10px 2px 0;
    padding: 0 10px;
  }

  .sub-nav-title {
    font-size: 1em;
    font-weight: 600;
    padding: 16px 30px;
  }

  .sub-nav-item {
    padding: 16px 46px;
  }

  .sub-nav-content {
    padding: 0 0 10px;
    width: 100%;
  }

  .sub-nav-message {
    color: var(--text1);
    display: flex;
    justify-content: center;
    padding: 16px 30px;
    width: 100%;
  }

  .sub-nav-loading {
    height: 30px;
    margin: 0 0 20px;
    position: relative;
    width: 100%;
  }
}
</style>
