<template>
  <div class="view-wrapper">
    <view-header title="Links" description="View and manage all your links.">
      <template v-slot:controls>
        <a-button :isPrimary="true" :to="{ name: 'links-add-link' }">
          <a-add-icon />
          <span>Add Link</span>
        </a-button>
      </template>
    </view-header>
    <div class="view-content">
      <links-list />
    </div>
  </div>
</template>

<script>
import AActionBar from '@/components/AActionBar';
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import LinksList from '@/containers/LinksList';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'links',
  components: {
    AAddIcon,
    AButton,
    LinksList,
    ViewHeader,
  },
};
</script>

<style lang="scss">
</style>
