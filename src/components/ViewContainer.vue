<template>
  <div class="view-container">
    <div class="view-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'view-container',
};
</script>

<style scoped lang="scss">
.view-container {
  height: 100%;
  left: 0;
  overflow: auto;
  position: absolute;
  top: 0;
  width: 100%;
}

.view-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 90px 30px 30px;
  position: relative;

  @media (min-width: 992px) {
    padding: 50px;
  }
}
</style>
