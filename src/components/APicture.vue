<template>
  <div class="picture-wrapper" :style="{height, width}">
    <app-loading v-if="src && imageUrl === ''" />
    <img 
      v-else-if="imageUrl"
      class="picture-image"
      :class="fillType"
      :src="imageUrl"
      :style="{height, width}"
    />
  </div>
</template>

<script>
import AppLoading from '@/components/AppLoading';

export const TYPES = {
  FILL: 'fill',
  FIT: 'fit',
};

export default {
  name: 'app-picture',
  components: {
    AppLoading,
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
  position: relative;
}

.picture-image {
  opacity: 1;
  transition: opacity 500ms ease-out;

  &.fill {
    object-fit: cover;
  }

  &.fit {
    object-fit: contain;
  }
}
</style>
