<template>
  <nav class="app-header">
    <app-logo></app-logo>
  </nav>
</template>

<script>
import AppLogo from '@/components/AppLogo';

export default {
  name: 'app-header',
  components: {
    AppLogo,
  },
};
</script>

<style scoped lang="scss">
.app-header {
  align-content: center;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 30px;
  width: 100%;
}
</style>
