<template>
  <a-grid>
    <router-link
      v-for="image in images"
      :key="image.id"
      style="text-decoration: none;"
      :to="image.to"
    >
      <a-image-card
        :enable-hover="true"
        :image-url="image.imageUrl"
        :title="image.title"
      />
    </router-link>
  </a-grid>
</template>

<script>
import AGrid from 'aura-design-system/src/AGrid';
import AImageCard from 'aura-design-system/src/AImageCard';

export default {
  name: 'image-grid',
  components: {
    AImageCard,
    AGrid,
  },
  props: {
    images: {
      type: Array,
    },
  },
};
</script>
