<template>
  <a-icon :height="height" :width="width">
    <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </a-icon>
</template>

<script>
import AIcon from '@/components/AIcon';

export default {
  name: 'a-back-arrow',
  components: {
    AIcon,
  },
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

<style scoped lang="scss"></style>
