<template>
  <div class="link-list">
    <app-loading v-if="isLoading" />
    <a-message-panel
      v-if="!isLoading && links.length === 0"
      text="You haven't got any links."
    >
      <a-button
        :isPrimary="true"
        :to="
          project
            ? { name: 'project-add-link', params: { id: project.id } }
            : { name: 'links-add-link' }
        "
      >
        <a-add-icon></a-add-icon>
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
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import AppLoading from '@/components/AppLoading';
import AMessagePanel from '@/components/AMessagePanel';
import LinksTable from '@/containers/LinksTable';

export default {
  name: 'link-list',
  components: {
    AAddIcon,
    AButton,
    AppLoading,
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
