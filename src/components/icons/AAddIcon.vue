<template>
  <a-icon :height="height" :width="width">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </a-icon>
</template>

<script>
import AIcon from '@/components/AIcon';

export default {
  name: 'a-add-icon',
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
