<template>
  <div class="a-action-bar">
    <div class="tabs-container">
      <div class="tabs" v-if="tabs">
        <router-link
          v-for="tab in tabs"
          :key="tab.id"
          class="tab"
          :class="{ 'is-active': currentTabId === tab.id }"
          :to="tab.to"
        >
          {{ tab.label }}
        </router-link>
      </div>
    </div>
    <div class="controls">
      <slot name="controls"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'a-action-bar',
  props: {
    currentTabId: {
      type: String,
    },
    tabs: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
.a-action-bar {
  align-items: center;
  background-color: var(--theme1);
  border-bottom: 1px solid var(--theme3);
  display: flex;
  height: 40px;
  justify-content: space-between;
  margin: 0 0 20px;

  .tabs {
    display: flex;
  }

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
    margin: 0 20px 3px 0;
    padding: 12px 0;
    text-decoration: none;

    &.is-active {
      border-bottom-color: var(--primary1);
      color: var(--primary1);
    }

    &:hover {
      color: var(--primary1);
    }
  }

  .controls {
    display: flex;

    & > * {
      margin: 0 0 0 10px;
    }
  }
}
</style>
