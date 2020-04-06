<template>
  <view-container>
    <app-loading v-if="!project" />
    <add-link-form
      v-if="project"
      :back-url="backUrl"
      :project="project"
      :sub-title="description"
      :title="title"
    />
  </view-container>
</template>

<script>
import AddLinkForm from '@/containers/AddLinkForm';
import AppLoading from '@/components/AppLoading';
import ViewContainer from '@/components/ViewContainer';

export default {
  name: 'project-add-link',
  components: {
    AddLinkForm,
    AppLoading,
    ViewContainer,
  },
  computed: {
    backUrl() {
      return {
        name: 'project',
        params: { id: this.project.id },
        query: { tab: 'links' },
      };
    },
    project() {
      return this.$store.getters['projects/find'](this.$route.params.id);
    },
    description() {
      return `Create a link and add it to ${this.project.name}`;
    },
    title() {
      return 'Add Link';
    },
  },
};
</script>

<style lang="scss"></style>
