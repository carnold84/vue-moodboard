<template>
  <view-container>
    <app-loading
      v-if="image === undefined || project === undefined || isRemoving === true"
    />
    <image-detail
      v-else-if="image && project && isRemoving === false"
      :backUrl="backUrl"
      :image="image"
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
    image() {
      return this.$store.getters['images/find'](this.imageId);
    },
    project() {
      return this.$store.getters['projects/find'](this.id);
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
