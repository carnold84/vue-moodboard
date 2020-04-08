<template>
  <a-icon :height="height" :width="width">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
    />
  </a-icon>
</template>

<script>
import AIcon from '@/components/AIcon';

export default {
  name: 'a-error-icon',
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
