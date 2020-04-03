<template>
  <div class="view-wrapper">
    <add-image-view
      :back-url="backUrl"
      :sub-title="description"
      :title="title"
    />
  </div>
</template>

<script>
import AddImageView from '@/components/AddImageView';

export default {
  name: 'images-add-image',
  components: {
    AddImageView,
  },
  computed: {
    backUrl() {
      return '/images';
    },
    description() {
      return 'Create and add an image.';
    },
    title() {
      return 'Add Image';
    },
  },
};
</script>

<style lang="scss"></style>
