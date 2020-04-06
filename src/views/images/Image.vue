<template>
  <view-container>
    <app-loading v-if="image === undefined || isRemoving === true" />
    <image-detail
      v-else-if="image && isRemoving === false"
      :backUrl="backUrl"
      :image="image"
    />
  </view-container>
</template>

<script>
import AppLoading from '@/components/AppLoading';
import ImageDetail from '@/containers/ImageDetail';
import ViewContainer from '@/components/ViewContainer';

export default {
  name: 'images-image',
  components: {
    AppLoading,
    ImageDetail,
    ViewContainer,
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
