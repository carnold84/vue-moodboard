<template>
  <a-icon :height="height" :width="width">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
    />
  </a-icon>
</template>

<script>
import AIcon from '@/components/AIcon';

export default {
  name: 'a-more-icon',
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
