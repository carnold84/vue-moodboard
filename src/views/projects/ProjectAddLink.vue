<template>
  <div class="view-wrapper">
    <app-loading v-if="!project" />
    <add-link-view
      v-if="project"
      :back-url="backUrl"
      :project="project"
      :sub-title="description"
      :title="title"
    />
  </div>
</template>

<script>
import AddLinkView from '@/components/AddLinkView';
import AppLoading from '@/components/AppLoading';

export default {
  name: 'project-add-link',
  components: {
    AddLinkView,
    AppLoading,
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
