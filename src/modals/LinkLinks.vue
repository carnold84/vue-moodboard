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
      <ul v-if="link && projects" class="projects-list">
        <li v-for="project of projects" :key="project.id" class="project-item">
          <div class="control">
            <app-loading v-if="areLinking[project.id]" diameter="20" />
            <a-button
              v-if="!areLinking[project.id] && !project.linkIds[link.id]"
              @click="onLink(project)"
            >
              <a-add-icon />
            </a-button>
            <a-button
              v-if="!areLinking[project.id] && project.linkIds[link.id]"
              @click="onUnlink(project)"
            >
              <a-remove-icon />
            </a-button>
          </div>
          {{ project.name }}
        </li>
      </ul>
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
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import ACloseIcon from '@/components/icons/ACloseIcon';
import AModal from '@/components/AModal';
import AppLoading from '@/components/AppLoading';
import ARemoveIcon from '@/components/icons/ARemoveIcon';

export const LINK_LINKS_MODAL = 'link-links-modal';

export default {
  name: 'link-links-modal',
  components: {
    AAddIcon,
    AButton,
    ACloseIcon,
    ARemoveIcon,
    AModal,
    AppLoading,
  },
  computed: {
    isActive() {
      return this.$store.getters['modals/active'] === this.name;
    },
    isOpen() {
      return this.$store.getters['modals/allOpen'].includes(this.name);
    },
    projects() {
      return this.$store.getters['projects/list'];
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

<style scoped lang="scss">
.projects-list {
  width: 100%;
}

.project-item {
  align-items: center;
  border-bottom: 1px solid var(--theme3);
  color: var(--text1);
  display: grid;
  grid-template-columns: 40px 1fr;
  font-size: 1em;
  font-weight: 600;
  line-height: 1.2em;
  padding: 15px 22px;
  width: 100%;
}

.control {
  height: 36px;
  position: relative;
  width: 36px;
}
</style>
