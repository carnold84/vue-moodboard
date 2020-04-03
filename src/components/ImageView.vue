<template>
  <div class="image-container">
    <view-header
      :description="image.description"
      :on-back="backUrl"
      :options="options"
      :title="image.name"
      class="image-view-header"
    />
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
import { DIALOG_NAME } from '@/modals/AppDialog';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'image-view',
  components: {
    APicture,
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
            callback: this.onRemove,
            id: 'remove',
            label: `Remove from ${this.project.name}`,
          },
        ];
      } else if (this.image && !this.project) {
        return options;
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
      this.$store.dispatch('modals/open', {
        name: DIALOG_NAME,
        props: {
          onConfirm: this.onConfirmDelete,
          text: `Are you sure you want to delete ${this.image.name}?`,
          title: 'Delete Image?',
        },
      });
    },
    async onConfirmDelete() {
      this.isRemoving = true;

      if (this.project) {
        this.image.projectId = this.project.id;
      }

      const response = await this.$store.dispatch('images/delete', this.image);

      if (response.success) {
        this.$router.push(this.backUrl);
      } else {
        console.error(response.message);
      }
    },
    async onRemove() {
      this.isRemoving = true;

      const response = await this.$store.dispatch('images/remove', {
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
.image-view-header {
  z-index: 1;
}

.image-container {
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
