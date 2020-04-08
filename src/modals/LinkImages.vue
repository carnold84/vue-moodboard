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
        :image="image"
        @link="onLink"
        @unlink="onUnlink"
      />
    </template>
    <template slot="footer">
      <a-button @click="onClose">
        <template v-slot:icon-left>
          <a-close-icon />
        </template>
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
import { TOAST_TYPES } from '@/components/AToastNotification.vue';
import ProjectsList from '@/containers/ProjectsList';

export const LINK_IMAGES_MODAL = 'link-images-modal';

export default {
  name: 'link-images-modal',
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
      name: LINK_IMAGES_MODAL,
    };
  },
  methods: {
    async onLink(project) {
      Vue.set(this.areLinking, project.id, project.id);

      const response = await this.$store.dispatch('images/link', {
        image: this.image,
        project,
      });

      Vue.delete(this.areLinking, project.id);

      this.$store.dispatch('toasts/add', {
        text: `"${this.image.name}" was added to "${project.name}".`,
        timeout: 3000,
        title: 'Image Added',
        type: TOAST_TYPES.SUCCESS,
      });
    },
    async onUnlink(project) {
      Vue.set(this.areLinking, project.id, project.id);

      const response = await this.$store.dispatch('images/unlink', {
        image: this.image,
        project,
      });

      Vue.delete(this.areLinking, project.id);

      this.$store.dispatch('toasts/add', {
        text: `"${this.image.name}" was removed from "${project.name}".`,
        timeout: 3000,
        title: 'Image Removed',
        type: TOAST_TYPES.SUCCESS,
      });
    },
    onClose() {
      this.$emit('dismiss', this.id);
    },
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    image: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss"></style>
