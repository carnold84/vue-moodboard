<template>
  <view-container>
    <view-header title="Images" description="View and manage all your images.">
      <template v-slot:controls>
        <a-button :isPrimary="true" @click="onAdd">
          <template v-slot:icon-left>
            <a-add-icon></a-add-icon>
          </template>
          <span>Add Image</span>
        </a-button>
      </template>
    </view-header>
    <div class="view-content">
      <image-list />
    </div>
  </view-container>
</template>

<script>
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import ImageList from '@/containers/ImageList';
import { MODAL_TYPES } from '@/containers/ModalManager';
import ViewContainer from '@/components/ViewContainer';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'images-list',
  components: {
    AAddIcon,
    AButton,
    ImageList,
    ViewContainer,
    ViewHeader,
  },
  methods: {
    onAdd() {
      this.$store.dispatch('modals/add', {
        title: 'Create A New Image',
        type: MODAL_TYPES.ADD_IMAGE,
      });
    },
  },
};
</script>

<style lang="scss">
</style>
