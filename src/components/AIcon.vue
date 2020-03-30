<template>
  <svg
    class="a-icon"
    :height="height"
    style="margin: 0 5px 0 0;"
    viewBox="0 0 24 24"
    :width="width"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot></slot>
  </svg>
</template>

<script>
export default {
  name: 'a-icon',
  props: {
    height: {
      default: '20',
      type: String,
    },
    width: {
      default: '20',
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.a-icon {
  fill: inherit;
}
</style>
