<template>
  <div class="view-wrapper">
    <app-loading
      v-if="image === undefined || project === undefined || isRemoving === true"
    ></app-loading>
    <image-view
      v-else-if="image && project && isRemoving === false"
      :backUrl="backUrl"
      :image="image"
      :project="project"
    ></image-view>
  </div>
</template>

<script>
import AppLoading from '@/components/AppLoading';
import ImageView from '@/components/ImageView';

export default {
  name: 'project-image',
  components: {
    AppLoading,
    ImageView,
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
