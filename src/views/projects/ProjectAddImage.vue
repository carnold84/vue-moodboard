<template>
  <div class="view-wrapper">
    <app-loading v-if="!project"></app-loading>
    <add-image-form
      v-if="project"
      :back-url="backUrl"
      :project="project"
      :sub-title="description"
      :title="title"
    />
  </div>
</template>

<script>
import AddImageForm from '@/containers/AddImageForm';
import AppLoading from '@/components/AppLoading';

export default {
  name: 'project-add-image',
  components: {
    AddImageForm,
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
