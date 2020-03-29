<template>
  <div class="a-message-panel">
    <h3 class="text">{{ text }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'a-message-panel',
  props: {
    text: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.a-message-panel {
  align-items: center;
  color: var(--text2);
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  position: absolute;
  width: 100%;
}

.text {
  font-size: 1.2em;
  font-weight: 600;
  line-height: 1.2em;
  margin: 0 0 10px;
}
</style>
