<template>
  <div class="a-image-grid">
    <app-loading v-if="images === undefined"></app-loading>
    <div v-else class="grid" :class="breakpoints">
      <resizable @resize="onResize" />
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
import Resizable from '@/components/Resizable';

export default {
  name: 'a-image-grid',
  components: {
    AImageLink,
    Resizable,
  },
  data() {
    return {
      breakpoints: [],
    };
  },
  methods: {
    onResize({ width }) {
      let classes = [];

      if (width > 400) {
        classes.push('sm');
      }

      if (width > 670) {
        classes.push('md');
      }

      if (width > 990) {
        classes.push('lg');
      }

      if (width > 990) {
        classes.push('xl');
      }
      console.log(classes);

      this.breakpoints = classes;
    },
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
