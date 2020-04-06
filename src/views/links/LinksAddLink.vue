<template>
  <view-container>
    <add-link-form
      :back-url="backUrl"
      :sub-title="description"
      :title="title"
    />
  </view-container>
</template>

<script>
import AddLinkForm from '@/containers/AddLinkForm';
import ViewContainer from '@/components/ViewContainer';

export default {
  name: 'links-add-link',
  components: {
    AddLinkForm,
    ViewContainer,
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
