<template>
  <theme-provider :theme="theme">
    <router-view />
  </theme-provider>
</template>

<script>
import { ThemeProvider } from 'vue-styled-components';
import defaultTheme from 'aura-design-system/src/themes/default';

export default {
  components: {
    ThemeProvider,
  },
  data() {
    return {
      theme: defaultTheme,
    };
  },
};
</script>

<style lang="scss">
@import "@/themes/default/index.scss";
@import "@/styles/main.scss";
</style>
