<template>
  <div class="view-wrapper">
    <view-header title="Links" description="View all your links." />
    <a-action-bar>
      <template v-slot:controls>
        <a-button :isPrimary="true" :to="{ name: 'links-add-link' }">
          <a-add-icon />
          <span>Add Links</span>
        </a-button>
      </template>
    </a-action-bar>
    <div class="view-content">
      <app-loading v-if="links === undefined" />
      <a-message-panel
        v-if="links && links.length === 0"
        text="You haven't got any links."
      >
        <a-button :isPrimary="true" :to="{ name: 'links-add-link' }">
          <a-add-icon></a-add-icon>
          <span>Add One!</span>
        </a-button>
      </a-message-panel>
      <links-list v-if="links && links.length > 0" :links="links" />
    </div>
  </div>
</template>

<script>
import AActionBar from '@/components/AActionBar';
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import AMessagePanel from '@/components/AMessagePanel';
import AImageGrid from '@/components/AImageGrid';
import AppLoading from '@/components/AppLoading';
import LinksList from '@/components/LinksList';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'links',
  components: {
    AActionBar,
    AAddIcon,
    AButton,
    AMessagePanel,
    AppLoading,
    LinksList,
    ViewHeader,
  },
  computed: {
    links() {
      let links = this.$store.getters['links/list'];

      console.log(links);

      return links.filter(element => {
        return element !== undefined;
      });
    },
  },
};
</script>

<style lang="scss">
</style>
