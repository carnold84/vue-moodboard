<template>
  <div class="view-wrapper">
    <view-header title="Images" description="View and manage all your images.">
      <template v-slot:controls>
        <a-button :isPrimary="true" :to="{ name: 'images-add-image' }">
          <a-add-icon></a-add-icon>
          <span>Add Image</span>
        </a-button>
      </template>
    </view-header>
    <div class="view-content">
      <images-list />
    </div>
  </div>
</template>

<script>
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import ImagesList from '@/containers/ImagesList';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'images',
  components: {
    AAddIcon,
    AButton,
    ImagesList,
    ViewHeader,
  },
};
</script>

<style lang="scss">
</style>
