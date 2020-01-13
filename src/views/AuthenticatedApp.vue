<template>
  <div v-if="!user" class="app-wrapper">
    <app-loading></app-loading>
  </div>
  <div v-else class="app-wrapper">
    <app-header>
      <template v-slot:content-left>
        <router-link to="/">
          <app-logo height="30px" style="align-self: center; margin: 0 20px 0 0;"></app-logo>
        </router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/projects">Projects</router-link>
      </template>
      <template v-if="isLoggedIn" v-slot:content-right>
        <a @click="logout">Logout</a>
      </template>
    </app-header>
    <div class="app-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppLoading from "@/components/AppLoading";
import AppLogo from "@/components/AppLogo";

export default {
  name: "authenticatedApp",
  components: {
    AppHeader,
    AppLoading,
    AppLogo
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  },
  mounted() {
    this.$store.dispatch("init");
  }
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

a {
  align-items: center;
  color: #333333;
  display: flex;
  font-weight: bold;
  margin: 0 15px 0 0;
  text-decoration: none;

  &.router-link-exact-active {
    color: var(--primary1);
  }
}
</style>
