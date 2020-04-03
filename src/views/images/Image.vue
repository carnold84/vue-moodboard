<template>
  <div class="view-wrapper">
    <app-loading
      v-if="image === undefined || isRemoving === true"
    ></app-loading>
    <image-view
      v-else-if="image && isRemoving === false"
      :backUrl="backUrl"
      :image="image"
    ></image-view>
  </div>
</template>

<script>
import AppLoading from '@/components/AppLoading';
import ImageView from '@/components/ImageView';

export default {
  name: 'images-image',
  components: {
    AppLoading,
    ImageView,
  },
  computed: {
    backUrl() {
      return '/images';
    },
    id() {
      return this.$route.params.id;
    },
    image() {
      return this.$store.getters['images/find'](this.id);
    },
  },
  data() {
    return {
      isRemoving: false,
    };
  },
};
</script>

<style scoped lang="scss"></style>
