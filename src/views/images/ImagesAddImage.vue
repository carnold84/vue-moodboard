<template>
  <div class="view-wrapper">
    <app-loading></app-loading>
    <add-image-view :back-url="backUrl" :sub-title="description" :title="title">
    </add-image-view>
  </div>
</template>

<script>
import AddImageView from '@/components/AddImageView';
import AppLoading from '@/components/AppLoading';

export default {
  name: 'images-add-image',
  components: {
    AddImageView,
    AppLoading,
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
