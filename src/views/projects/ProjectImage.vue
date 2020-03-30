<template>
  <div class="view-wrapper">
    <app-loading
      v-if="image === undefined || project === undefined || isRemoving === true"
    ></app-loading>
    <div v-else-if="image && project && isRemoving === false">
      <view-header
        :description="image.description"
        :on-back="backUrl"
        :options="options"
        section-name="Image"
        :title="image.name"
      ></view-header>
      <a
        v-if="image && isRemoving === false"
        :href="imageUrl"
        target="_blank"
        title="Click to view full image"
      >
        <img :alt="image.name" :src="imageUrl" />
      </a>
    </div>
  </div>
</template>

<script>
import AppLoading from '@/components/AppLoading';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'project-image',
  components: {
    AppLoading,
    ViewHeader,
  },
  computed: {
    backUrl() {
      return `/projects/${this.id}`;
    },
    id() {
      return this.$route.params.id;
    },
    imageId() {
      return this.$route.params.imageId;
    },
    image() {
      return this.$store.getters['images/image'](this.imageId);
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
      if (this.image && this.project) {
        return [
          {
            callback: this.onDelete,
            id: 'delete',
            label: `Delete ${this.image.name}`,
          },
          {
            callback: this.onRemove,
            id: 'remove',
            label: `Remove from ${this.project.name}`,
          },
        ];
      }

      return undefined;
    },
    project() {
      return this.$store.getters['projects/project'](this.id);
    },
  },
  data() {
    return {
      isRemoving: false,
    };
  },
  methods: {
    async onDelete() {
      this.isRemoving = true;

      const response = await this.$store.dispatch('images/delete', this.image);

      if (response.success) {
        this.$router.push(backUrl);
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
        this.$router.push(backUrl);
      } else {
        console.error(response.message);
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
