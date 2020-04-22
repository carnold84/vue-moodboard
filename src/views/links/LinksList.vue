<template>
  <view-container>
    <view-header title="Links" description="View and manage all your links.">
      <template v-slot:controls>
        <a-button :isPrimary="true" @click="onAdd">
          <template v-slot:icon-left>
            <a-add-icon />
          </template>
          <span>Add Link</span>
        </a-button>
      </template>
    </view-header>
    <div class="view-content">
      <link-list />
    </div>
  </view-container>
</template>

<script>
import { AButton } from 'aura-design-system';
import AActionBar from '@/components/AActionBar';
import AAddIcon from '@/components/icons/AAddIcon';
import LinkList from '@/containers/LinkList';
import { MODAL_TYPES } from '@/containers/ModalManager';
import ViewContainer from '@/components/ViewContainer';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'links-list',
  components: {
    AAddIcon,
    AButton,
    LinkList,
    ViewContainer,
    ViewHeader,
  },
  methods: {
    onAdd() {
      this.$store.dispatch('modals/add', {
        title: 'Create A New Link',
        type: MODAL_TYPES.ADD_LINK,
      });
    },
  },
};
</script>

<style lang="scss">
</style>
