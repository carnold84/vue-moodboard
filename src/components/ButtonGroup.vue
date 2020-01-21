<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'button-group',
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;

  * {
    margin-left: 10px;
  }
}
</style>
