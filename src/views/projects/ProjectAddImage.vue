<template>
  <div class="view-wrapper">
    <app-loading v-if="!project"></app-loading>
    <add-image-view
      v-if="project"
      :back-url="backUrl"
      :project="project"
      :sub-title="description"
      :title="title"
    >
    </add-image-view>
  </div>
</template>

<script>
import AddImageView from '@/components/AddImageView';
import AppLoading from '@/components/AppLoading';

export default {
  name: 'project-add-image',
  components: {
    AddImageView,
    AppLoading,
  },
  computed: {
    backUrl() {
      return `/projects/${this.project.id}`;
    },
    project() {
      return this.$store.getters['projects/find'](this.$route.params.id);
    },
    description() {
      return `Create an image and add it to ${this.project.name}`;
    },
    title() {
      return 'Add Image';
    },
  },
};
</script>

<style lang="scss"></style>
