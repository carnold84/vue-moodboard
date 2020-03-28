<template>
  <div class="view-wrapper">
    <div class="row">
      <div class="col-12">
        <view-header :title="image.name"></view-header>
        <button-group>
          <app-button @click="onRemove" :is-primary="true">Remove from {{ project.name }}</app-button>
          <app-button @click="onDelete" :is-primary="true">Delete</app-button>
        </button-group>
      </div>
    </div>
    <app-loading v-if="isRemoving === true"></app-loading>
    <div v-if="image && isRemoving === false" class="row">
      <div class="col-12">
        <img :alt="image.name" :src="imageUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader';
import AppButton from '@/components/AppButton';
import AppLoading from '@/components/AppLoading';
import ButtonGroup from '@/components/ButtonGroup';

export default {
  name: 'project-image',
  components: {
    ViewHeader,
    AppButton,
    AppLoading,
    ButtonGroup,
  },
  computed: {
    breadcrumb() {
      return [
        {
          title: 'Projects',
          to: '/projects',
        },
        {
          title: this.project.name,
          to: `/projects/${this.id}`,
        },
        {
          title: this.image.name,
        },
      ];
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
        return `https://res.cloudinary.com/carnold/image/upload/w_1200/${this.image.fileName}.${this.image.format}`;
      } else {
        return this.image.url;
      }
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
        this.$router.push(`/projects/${this.id}`);
      } else {
        console.error(response.message);
      }
    },
    async onRemove() {
      this.isRemoving = true;

      console.log(this.image, this.project);

      const response = await this.$store.dispatch('images/remove', {
        image: this.image,
        project: this.project,
      });

      if (response.success) {
        this.$router.push(`/projects/${this.id}`);
      } else {
        console.error(response.message);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
