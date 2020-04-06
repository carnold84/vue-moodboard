<template>
  <view-container>
    <view-header title="Links" description="View and manage all your links.">
      <template v-slot:controls>
        <a-button :isPrimary="true" :to="{ name: 'links-add-link' }">
          <a-add-icon />
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
import AActionBar from '@/components/AActionBar';
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import LinkList from '@/containers/LinkList';
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
};
</script>

<style lang="scss">
</style>
