<template>
  <div class="link-list">
    <a-loading v-if="isLoading" />
    <a-message-panel
      v-if="!isLoading && links.length === 0"
      text="You haven't got any links."
    >
      <router-button
        :isPrimary="true"
        :to="
          project
            ? { name: 'project-add-link', params: { id: project.id } }
            : { name: 'links-add-link' }
        "
      >
        <template v-slot:icon-left>
          <a-add-icon />
        </template>
        <span>Add One!</span>
      </router-button>
    </a-message-panel>
    <links-table
      v-if="!isLoading && links.length > 0"
      :links="links"
      :project="project"
    />
  </div>
</template>

<script>
import ALoading from 'aura-design-system/src/ALoading';
import AAddIcon from 'aura-design-system/src/icons/AAddIcon';

import AMessagePanel from '@/components/AMessagePanel';
import LinksTable from '@/containers/LinksTable';
import RouterButton from '@/components/RouterButton';

export default {
  name: 'link-list',
  components: {
    AAddIcon,
    ALoading,
    AMessagePanel,
    LinksTable,
    RouterButton,
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
