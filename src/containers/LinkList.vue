<template>
  <div class="link-list">
    <a-loading v-if="isLoading" />
    <a-message-panel
      v-if="!isLoading && links.length === 0"
      text="You haven't got any links."
    >
      <a-button :isPrimary="true" @click="onAdd">
        <template v-slot:icon-left>
          <a-add-icon />
        </template>
        <span>Add One!</span>
      </a-button>
    </a-message-panel>
    <links-table
      v-if="!isLoading && links.length > 0"
      :links="links"
      :project="project"
    />
  </div>
</template>

<script>
import AButton from 'aura-design-system/src/AButton';
import ALoading from 'aura-design-system/src/ALoading';
import AMessagePanel from 'aura-design-system/src/AMessagePanel';
import AAddIcon from 'aura-design-system/src/icons/AAddIcon';

import LinksTable from '@/containers/LinksTable';
import { MODAL_TYPES } from '@/containers/ModalManager';
import RouterButton from '@/components/RouterButton';

export default {
  name: 'link-list',
  components: {
    AButton,
    AAddIcon,
    ALoading,
    AMessagePanel,
    LinksTable,
  },
  computed: {
    links() {
      const links = this.$store.getters['links/findAll'](this.linkIds);
      return links;
    },
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    async load() {
      if (this.linkIds && this.linkIds.length === 0) {
        this.isLoading = false;
        return;
      }

      this.isLoading = true;
      const links = await this.$store.dispatch('links/load', this.linkIds);
      this.isLoading = false;
    },
    onAdd() {
      this.$store.dispatch('modals/add', {
        title: 'Create A New Link',
        type: MODAL_TYPES.ADD_LINK,
      });
    },
  },
  mounted() {
    this.load();
  },
  props: {
    linkIds: {
      default: null,
      type: Array,
    },
    project: {
      type: Object,
    },
  },
  watch: {
    linkIds: 'load',
  },
};
</script>

<style scoped lang="scss">
.link-list {
  flex-grow: 1;
  min-height: 100%;
  position: relative;
}
</style>
