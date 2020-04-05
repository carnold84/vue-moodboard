<template>
  <a-modal
    :is-active="isActive"
    :is-open="isOpen"
    max-width="400px"
    :name="name"
    :title="title"
    @close="onClose"
  >
    <template slot="content">
      <projects-list
        :areLinking="areLinking"
        :link="link"
        @link="onLink"
        @unlink="onUnlink"
      />
    </template>
    <template slot="footer">
      <a-button @click="onClose">
        <a-close-icon />
        Close
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import Vue from 'vue';
import AButton from '@/components/AButton';
import ACloseIcon from '@/components/icons/ACloseIcon';
import AModal from '@/components/AModal';
import ProjectsList from '@/containers/ProjectsList';

export const LINK_LINKS_MODAL = 'link-links-modal';

export default {
  name: 'link-links-modal',
  components: {
    AButton,
    ACloseIcon,
    AModal,
    ProjectsList,
  },
  computed: {
    isActive() {
      return this.$store.getters['modals/active'] === this.name;
    },
    isOpen() {
      return this.$store.getters['modals/allOpen'].includes(this.name);
    },
  },
  data() {
    return {
      areLinking: {},
      name: LINK_LINKS_MODAL,
    };
  },
  methods: {
    async onLink(project) {
      Vue.set(this.areLinking, project.id, project.id);

      const response = await this.$store.dispatch('links/link', {
        link: this.link,
        project,
      });

      Vue.delete(this.areLinking, project.id);
    },
    async onUnlink(project) {
      Vue.set(this.areLinking, project.id, project.id);

      const response = await this.$store.dispatch('links/unlink', {
        link: this.link,
        project,
      });

      Vue.delete(this.areLinking, project.id);
    },
    onClose() {
      this.$store.dispatch('modals/close', this.name);
    },
  },
  props: {
    link: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss"></style>
