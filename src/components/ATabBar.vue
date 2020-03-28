<template>
  <div class="a-tab-bar">
    <router-link v-for="tab in tabs" :key="tab.id" class="tab" :to="tab.to">{{tab.label}}</router-link>
    <div class="controls">
      <slot name="controls"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'a-tab-bar',
  props: {
    tabs: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
.a-tab-bar {
  align-items: center;
  border-bottom: 1px solid var(--theme3);
  display: flex;
  justify-content: space-between;

  .tab {
    align-items: center;
    background-color: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--text1);
    cursor: pointer;
    display: flex;
    font-family: var(--fontFamily--primary);
    font-size: 1em;
    font-weight: 600;
    margin: 0 20px 0 0;
    padding: 12px 0;
    text-decoration: none;

    &.router-link-exact-active {
      border-bottom-color: var(--primary1);
      color: var(--primary1);
    }

    &:hover {
      color: var(--primary1);
    }
  }
}
</style>
