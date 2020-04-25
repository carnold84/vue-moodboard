<template>
  <div class="picture-wrapper" :style="{ height, width }">
    <a-loading v-if="src && imageUrl === ''" />
    <img
      v-else-if="imageUrl"
      class="picture-image"
      :class="fillType"
      :src="imageUrl"
      :style="{ border }"
    />
  </div>
</template>

<script>
import { ALoading } from 'aura-design-system';

export const TYPES = {
  FILL: 'fill',
  FIT: 'fit',
};

export default {
  name: 'app-picture',
  components: {
    ALoading,
  },
  data() {
    return {
      image: undefined,
      imageUrl: '',
    };
  },
  destroyed() {
    if (this.image) {
      this.image.removeEventListener('load', this.onImageLoaded, false);
    }
  },
  methods: {
    onImageLoaded() {
      this.imageUrl = this.image.src;
      this.image.removeEventListener('load', this.onImageLoaded, false);
    },
  },
  mounted() {
    if (this.src) {
      this.image = new Image(this.width, this.height);
      this.image.addEventListener('load', this.onImageLoaded, false);
      this.image.src = this.src;
    }
  },
  props: {
    border: {
      type: String,
    },
    fillType: {
      default: TYPES.FILL,
      type: String,
      validator: value => {
        return [TYPES.FILL, TYPES.FIT].includes(value);
      },
    },
    height: {
      default: '100%',
      type: String,
    },
    src: {
      type: String,
    },
    width: {
      default: '100%',
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.picture-wrapper {
  align-items: center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.picture-image {
  opacity: 1;
  transition: opacity 500ms ease-out;

  &.fill {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  &.fit {
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
