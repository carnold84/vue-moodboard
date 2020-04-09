<template>
  <view-container>
    <app-loading v-if="project === undefined" />
    <image-detail
      v-else-if="project"
      :backUrl="backUrl"
      :imageId="imageId"
      :project="project"
    />
  </view-container>
</template>

<script>
import AppLoading from '@/components/AppLoading';
import ImageDetail from '@/containers/ImageDetail';
import ViewContainer from '@/components/ViewContainer';

export default {
  name: 'project-image',
  components: {
    AppLoading,
    ImageDetail,
    ViewContainer,
  },
  computed: {
    backUrl() {
      return `/projects/${this.id}`;
    },
    id() {
      return this.$route.params.id;
    },
    imageId() {
      return this.$route.params.imageId;
    },
    project() {
      return this.$store.getters['projects/find'](this.id);
    },
  },
};
</script>

<style scoped lang="scss"></style>
