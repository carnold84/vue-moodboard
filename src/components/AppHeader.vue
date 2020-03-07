<template>
  <nav class="wrapper">
    <div class="content-left">
      <slot name="content-left"></slot>
    </div>
    <div class="content-center">
      <slot name="content-center"></slot>
    </div>
    <div class="content-right">
      <slot name="content-right"></slot>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-header',
};
</script>

<style scoped lang="scss">
.wrapper {
  align-content: center;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 30px;
  width: 100%;
}

.content-left, .content-center, .content-right {
  align-content: center;
  display: flex;
  height: 100%;
}
</style>
