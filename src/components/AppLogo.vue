<template>
  <img src="img/logo.png" :style="{height: height, width: width}" />
</template>

<script>
export default {
  name: 'app-logo',
  props: {
    height: {
      type: String,
      default: '30px',
    },
    width: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
