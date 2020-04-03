<template>
  <div class="view-wrapper">
    <add-link-view
      :back-url="backUrl"
      :sub-title="description"
      :title="title"
    />
  </div>
</template>

<script>
import AddLinkView from '@/components/AddLinkView';

export default {
  name: 'links-add-link',
  components: {
    AddLinkView,
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
