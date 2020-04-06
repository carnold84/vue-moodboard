<template>
  <view-container>
    <add-image-form
      :back-url="backUrl"
      :sub-title="description"
      :title="title"
    />
  </view-container>
</template>

<script>
import AddImageForm from '@/containers/AddImageForm';
import ViewContainer from '@/components/ViewContainer';

export default {
  name: 'images-add-image',
  components: {
    AddImageForm,
    ViewContainer,
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
