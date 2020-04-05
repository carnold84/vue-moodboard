<template>
  <div class="view-wrapper">
    <add-link-form
      :back-url="backUrl"
      :sub-title="description"
      :title="title"
    />
  </div>
</template>

<script>
import AddLinkForm from '@/containers/AddLinkForm';

export default {
  name: 'links-add-link',
  components: {
    AddLinkForm,
  },
  computed: {
    backUrl() {
      return '/links';
    },
    description() {
      return 'Create and add an link.';
    },
    title() {
      return 'Add Link';
    },
  },
};
</script>

<style lang="scss"></style>
