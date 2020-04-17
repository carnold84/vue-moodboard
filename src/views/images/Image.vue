<template>
  <view-container>
    <image-detail backUrl="/images" :imageId="id" />
  </view-container>
</template>

<script>
import ImageDetail from '@/containers/ImageDetail';
import ViewContainer from '@/components/ViewContainer';

export default {
  name: 'images-image',
  components: {
    ImageDetail,
    ViewContainer,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped lang="scss"></style>
