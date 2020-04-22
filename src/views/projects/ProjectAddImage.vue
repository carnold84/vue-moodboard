<template>
  <view-container>
    <a-loading v-if="!project" />
    <add-image-form
      v-if="project"
      :back-url="backUrl"
      :project="project"
      :sub-title="description"
      :title="title"
    />
  </view-container>
</template>

<script>
import ALoading from 'aura-design-system/src/ALoading';

import AddImageForm from '@/containers/AddImageForm';
import ViewContainer from '@/components/ViewContainer';

export default {
  name: 'project-add-image',
  components: {
    AddImageForm,
    ALoading,
    ViewContainer,
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
