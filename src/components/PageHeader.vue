<template>
  <nav class="page-header">
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
  name: 'page-header',
};
</script>

<style scoped lang="scss">
.page-header {
  align-content: center;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  margin: 0 0 10px;
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
