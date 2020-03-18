<template>
  <div class="wrapper" :class="align">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'button-group',
  props: {
    align: {
      default: 'left',
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;

  &.left {
    justify-content: flex-start;

    *:not(:last-child) {
      margin-right: 10px;
    }
  }

  &.right {
    justify-content: flex-end;

    *:not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>
