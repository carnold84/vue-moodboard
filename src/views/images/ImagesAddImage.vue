<template>
  <div class="view-wrapper">
    <add-image-form
      :back-url="backUrl"
      :sub-title="description"
      :title="title"
    />
  </div>
</template>

<script>
import AddImageForm from '@/containers/AddImageForm';

export default {
  name: 'images-add-image',
  components: {
    AddImageForm,
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
