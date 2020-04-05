<template>
  <div class="view-wrapper">
    <view-header title="Links" description="View and manage all your links." />
    <a-action-bar>
      <template v-slot:controls>
        <a-button :isPrimary="true" :to="{ name: 'links-add-link' }">
          <a-add-icon />
          <span>Add Links</span>
        </a-button>
      </template>
    </a-action-bar>
    <div class="view-content">
      <links-container />
    </div>
  </div>
</template>

<script>
import AActionBar from '@/components/AActionBar';
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import LinksContainer from '@/containers/Links';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'links',
  components: {
    AActionBar,
    AAddIcon,
    AButton,
    LinksContainer,
    ViewHeader,
  },
};
</script>

<style lang="scss">
</style>
