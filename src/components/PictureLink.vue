<template>
  <router-link :to="to">
    <a-image-card
      :enable-hover="true"
      :imageHeight="imageHeight"
      :image-url="imageUrl"
      :title="title"
    />
  </router-link>
</template>

<script>
import AImageCard from 'aura-design-system/src/AImageCard';

export default {
  name: 'image-link',
  components: {
    AImageCard,
  },
  props: {
    imageHeight: {
      default: '200px',
      type: String,
    },
    imageUrl: {
      type: String,
    },
    title: {
      type: String,
    },
    to: {
      type: [Object, String],
    },
  },
};
</script>
