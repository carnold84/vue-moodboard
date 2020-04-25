<template>
  <div class="image-detail">
    <a-loading v-if="isLoading || isRemoving" />
    <div v-if="image && !isLoading && !isRemoving" class="content">
      <view-header
        :description="image.description"
        :on-back="backUrl"
        :title="image.name"
        class="image-view-header"
      >
        <template v-slot:controls>
          <a-button @click="onEdit">
            <template v-slot:icon-left>
              <a-create-icon height="16" width="16" />
            </template>
            <span>Edit</span>
          </a-button>
          <a-select
            v-if="options"
            alignMenu="right"
            :items="options"
            @select="onSelect"
          />
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
  </div>
</template>

<script>
import AButton from 'aura-design-system/src/AButton';
import ALoading from 'aura-design-system/src/ALoading';
import APicture, { TYPES } from 'aura-design-system/src/APicture';
import ACreateIcon from 'aura-design-system/src/icons/ACreateIcon';
import ASelect from 'aura-design-system/src/ASelect';
import { TOAST_TYPES } from 'aura-design-system/src/AToast';

import { MODAL_TYPES } from '@/containers/ModalManager';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'image-detail',
  components: {
    AButton,
    ACreateIcon,
    ALoading,
    APicture,
    ASelect,
    ViewHeader,
  },
  computed: {
    image() {
      return this.$store.getters['images/find'](this.imageId);
    },
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
          id: 'delete',
          label: `Delete ${this.image.name}`,
        },
      ];
      if (this.image && this.project) {
        return [
          ...options,
          {
            id: 'remove',
            label: `Remove from ${this.project.name}`,
          },
        ];
      } else if (this.image && !this.project) {
        return [
          ...options,
          {
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
      isLoading: false,
      isRemoving: false,
      TYPES,
    };
  },
  methods: {
    async load() {
      this.isLoading = true;
      const images = await this.$store.dispatch('images/load', [this.imageId]);
      this.isLoading = false;
    },
    async onConfirmDelete() {
      this.isRemoving = true;

      if (this.project) {
        this.image.projectId = this.project.id;
      }

      // store image so we can use it after it's deleted
      const image = this.image;
      const response = await this.$store.dispatch('images/delete', image);

      if (response.success) {
        this.$store.dispatch('toasts/add', {
          text: `"${image.name}" was deleted.`,
          timeout: 4000,
          title: 'Image Deleted',
          type: TOAST_TYPES.SUCCESS,
        });
        this.$router.push(this.backUrl);
      } else {
        this.isRemoving = false;
        this.$store.dispatch('toasts/add', {
          text: `"${image.name}" couldn't be deleted.`,
          title: 'Error',
          type: TOAST_TYPES.ERROR,
        });
        console.error(response.message);
      }
    },
    onDelete() {
      this.$store.dispatch('modals/add', {
        onConfirm: this.onConfirmDelete,
        text: `Are you sure you want to delete ${this.image.name}?`,
        title: 'Delete Image?',
        type: MODAL_TYPES.CONFIRM_DIALOG,
      });
    },
    onEdit() {
      this.$store.dispatch('modals/add', {
        image: this.image,
        project: this.project,
        title: `Edit ${this.image.name}`,
        type: MODAL_TYPES.ADD_IMAGE,
      });
    },
    onLinkToProject() {
      this.$store.dispatch('modals/add', {
        image: this.image,
        title: `Add ${this.image.name} To A Project`,
        type: MODAL_TYPES.LINK_IMAGES,
      });
    },
    onSelect(id) {
      switch (id) {
        case 'delete':
          this.onDelete();
          break;

        case 'remove':
          this.onUnlink();
          break;

        case 'manage-links':
          this.onLinkToProject();
          break;
      }
    },
    async onUnlink() {
      this.isRemoving = true;

      const response = await this.$store.dispatch('images/unlink', {
        image: this.image,
        project: this.project,
      });

      if (response.success) {
        this.$store.dispatch('toasts/add', {
          text: `"${this.image.name}" was removed from "${this.project.name}".`,
          timeout: 4000,
          title: 'Image Removed',
          type: TOAST_TYPES.SUCCESS,
        });
        this.$router.push(this.backUrl);
      } else {
        this.$store.dispatch('toasts/add', {
          text: `"${this.image.name}" couldn't be removed.`,
          title: 'Error',
          type: TOAST_TYPES.ERROR,
        });
        console.error(response.message);
      }
    },
  },
  mounted() {
    if (this.image === undefined) {
      this.load();
    }
  },
  props: {
    backUrl: {
      type: [Object, String],
    },
    imageId: {
      required: true,
      type: [Number, String],
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
  position: relative;
}

.image-view-header {
  z-index: 1;
}

.content {
  display: flex;
  flex-direction: column;
  height: 100%;
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
