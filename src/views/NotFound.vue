<template>
  <a-message-panel>
    <h3 style="margin: 0 0 10px;">404: Not found</h3>
    <h4>This page doesn't exist.</h4>
  </a-message-panel>
</template>

<script>
import AMessagePanel from 'aura-design-system/src/AMessagePanel';

export default {
  name: 'not-found',
  components: {
    AMessagePanel,
  },
};
</script>

<style lang="scss">
</style>
