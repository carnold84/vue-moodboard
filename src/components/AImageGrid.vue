<template>
  <div class="a-image-grid">
    <app-loading v-if="images === undefined"></app-loading>
    <div v-else class="grid" v-responsive="breakpoints">
      <a-image-link
        v-for="image in images"
        :key="image.id"
        :imageUrl="image.imageUrl"
        :title="image.title"
        :to="image.to"
      ></a-image-link>
    </div>
  </div>
</template>

<script>
import AImageLink from '@/components/AImageLink';

export default {
  name: 'a-image-grid',
  components: {
    AImageLink,
  },
  data() {
    return {
      breakpoints: {
        sm: el => el.width > 400,
        md: el => el.width > 670,
        lg: el => el.width > 990,
        xl: el => el.width > 1200,
      },
    };
  },
  props: {
    images: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
.a-image-grid {
  height: 100%;

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;

    &.sm {
      column-gap: 20px;
      grid-template-columns: 1fr 1fr;
    }

    &.md {
      column-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
    }

    &.lg,
    &.xl {
      column-gap: 30px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      row-gap: 30px;
    }
  }
}
</style>
