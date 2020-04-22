<template>
  <theme-provider :theme="themes.default">
    <router-view />
  </theme-provider>
</template>

<script>
import { ThemeProvider } from 'vue-styled-components';
import { themes } from 'aura-design-system';

console.log(themes);

export default {
  components: {
    ThemeProvider,
  },
  data() {
    return {
      themes,
    };
  },
};
</script>

<style lang="scss">
@import "@/themes/default/index.scss";
@import "@/styles/main.scss";
</style>
