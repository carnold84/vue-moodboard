<template>
  <div class="view-wrapper">
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
    <links-list v-if="!isLoading && links.length > 0" :links="links" />
  </div>
</template>

<script>
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import AppLoading from '@/components/AppLoading';
import AMessagePanel from '@/components/AMessagePanel';
import LinksList from '@/components/LinksList';

export default {
  name: 'links-container',
  components: {
    AAddIcon,
    AButton,
    AppLoading,
    AMessagePanel,
    LinksList,
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
      Object,
    },
  },
  watch: {
    linkIds(val, oldVal) {
      this.load();
    },
  },
};
</script>

<style scoped lang="scss"></style>
