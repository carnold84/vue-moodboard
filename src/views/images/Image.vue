<template>
  <div class="view-wrapper">
    <app-loading v-if="image === undefined || isRemoving === true" />
    <image-detail
      v-else-if="image && isRemoving === false"
      :backUrl="backUrl"
      :image="image"
    />
  </div>
</template>

<script>
import AppLoading from '@/components/AppLoading';
import ImageDetail from '@/containers/ImageDetail';

export default {
  name: 'images-image',
  components: {
    AppLoading,
    ImageDetail,
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
