<template>
  <a-modal :id="id" max-width="400px" :title="title" @dismiss="onDismiss">
    <template slot="content">
      <projects-list
        :areLinking="areLinking"
        :image="image"
        @link="onLink"
        @unlink="onUnlink"
      />
    </template>
    <template slot="footer">
      <a-button @click="onDismiss">
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
import AButton from 'aura-design-system/src/AButton';
import AModal from 'aura-design-system/src/AModal';
import ACheckIcon from 'aura-design-system/src/icons/ACheckIcon';
import ACloseIcon from 'aura-design-system/src/icons/ACloseIcon';
import { TOAST_TYPES } from 'aura-design-system/src/AToast';

import ProjectsList from '@/containers/ProjectsList';

export default {
  name: 'link-images-modal',
  components: {
    AButton,
    ACloseIcon,
    AModal,
    ProjectsList,
  },
  data() {
    return {
      areLinking: {},
    };
  },
  methods: {
    onDismiss() {
      this.$emit('dismiss', this.id);
    },
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
