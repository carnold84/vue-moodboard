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
  display: flex;
  left: 0;
  min-height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
}

.view-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 90px 30px 30px;
  position: relative;

  @media (min-width: 992px) {
    padding: 50px;
  }
}
</style>
