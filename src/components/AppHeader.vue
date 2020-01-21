<template>
  <nav class="wrapper">
    <div class="content-left">
      <slot name="content-left"></slot>
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
  background-color: var(--button__bg-color);
  border-bottom: var(--button__border-color) solid 1px;
  display: flex;
  flex-shrink: 0;
  height: 60px;
  justify-content: space-between;
  padding: 0 15px;
  width: 100%;
}

.content-left {
  align-content: center;
  display: flex;
  height: 100%;
}

.content-right {
  align-content: center;
  display: flex;
  height: 100%;
}
</style>
