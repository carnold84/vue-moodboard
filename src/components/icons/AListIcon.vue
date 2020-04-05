<template>
  <a-icon :height="height" :width="width">
    <path
      d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
    /><path d="M0 0h24v24H0z" fill="none" />
  </a-icon>
</template>

<script>
import AIcon from '@/components/AIcon';

export default {
  name: 'a-list-icon',
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
