<template>
  <div class="image-detail">
    <view-header
      :description="image.description"
      :on-back="backUrl"
      :title="image.name"
      class="image-view-header"
    >
      <template v-slot:controls>
        <a-select v-if="options" alignMenu="right" :items="options" />
      </template>
    </view-header>
    <div class="image-content">
      <a
        :href="imageUrl"
        rel="noreferrer"
        target="_blank"
        title="Click to view full image"
      >
        <a-picture
          :alt="image.name"
          border="1px solid var(--theme4)"
          :fill-type="TYPES.FIT"
          :src="imageUrl"
          class="image"
        />
      </a>
    </div>
  </div>
</template>

<script>
import APicture, { TYPES } from '@/components/APicture';
import ASelect from '@/components/ASelect';
import { TOAST_TYPES } from '@/components/AToastNotification.vue';
import { MODAL_TYPES } from '@/containers/ModalManager';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'image-detail',
  components: {
    APicture,
    ASelect,
    ViewHeader,
  },
  computed: {
    imageUrl() {
      if (this.image.format) {
        const rootUrl = 'https://res.cloudinary.com/carnold/image/upload';
        return `${rootUrl}/w_1200/${this.image.fileName}.${this.image.format}`;
      } else {
        return this.image.url;
      }
    },
    options() {
      let options = [
        {
          callback: this.onDelete,
          id: 'delete',
          label: `Delete ${this.image.name}`,
        },
      ];
      if (this.image && this.project) {
        return [
          ...options,
          {
            callback: this.onUnlink,
            id: 'remove',
            label: `Remove from ${this.project.name}`,
          },
        ];
      } else if (this.image && !this.project) {
        return [
          ...options,
          {
            callback: this.onLinkToProject,
            id: 'manage-links',
            label: `Add ${this.image.name} to Projects`,
          },
        ];
      }

      return undefined;
    },
  },
  data() {
    return {
      isRemoving: false,
      TYPES,
    };
  },
  methods: {
    onDelete() {
      this.$store.dispatch('modals/add', {
        onConfirm: this.onConfirmDelete,
        text: `Are you sure you want to delete ${this.image.name}?`,
        title: 'Delete Image?',
        type: MODAL_TYPES.CONFIRM_DIALOG,
      });
    },
    async onConfirmDelete() {
      this.isRemoving = true;

      if (this.project) {
        this.image.projectId = this.project.id;
      }

      const response = await this.$store.dispatch('images/delete', this.image);

      if (response.success) {
        this.$store.dispatch('toasts/add', {
          text: `"${this.image.name}" was deleted.`,
          timeout: 4000,
          title: 'Image Deleted',
          type: TOAST_TYPES.SUCCESS,
        });
        this.$router.push(this.backUrl);
      } else {
        this.isRemoving = false;
        this.$store.dispatch('toasts/add', {
          text: `"${this.image.name}" couldn't be deleted.`,
          title: 'Error',
          type: TOAST_TYPES.ERROR,
        });
        console.error(response.message);
      }
    },
    onLinkToProject() {
      this.$store.dispatch('modals/add', {
        name: MODAL_TYPES.LINK_IMAGES,
        props: {
          image: this.image,
          title: `Add ${this.image.name} to a project`,
        },
      });
    },
    async onUnlink() {
      this.isRemoving = true;

      const response = await this.$store.dispatch('images/unlink', {
        image: this.image,
        project: this.project,
      });

      if (response.success) {
        this.$router.push(this.backUrl);
      } else {
        console.error(response.message);
      }
    },
  },
  props: {
    backUrl: {
      type: [Object, String],
    },
    image: {
      required: true,
      type: Object,
    },
    project: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.image-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.image-view-header {
  z-index: 1;
}

.image-content {
  flex-grow: 1;
  position: relative;
  z-index: 0;
}

.image {
  position: absolute;
}
</style>
