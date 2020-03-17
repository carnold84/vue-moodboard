<template>
  <div class="view-container">
    <div class="row">
      <div class="col-12">
        <breadcrumb-nav :items="breadcrumb"></breadcrumb-nav>
        <page-header>
          <template v-slot:content-left>
            <h1 class="view-title">{{image.name}}</h1>
          </template>
          <template v-slot:content-right>
            <button-group>
              <app-button @click="onRemove" :is-primary="true">Remove from {{ project.name }}</app-button>
              <app-button @click="onDelete" :is-primary="true">Delete</app-button>
            </button-group>
          </template>
        </page-header>
      </div>
    </div>
    <app-loading v-if="isRemoving === true"></app-loading>
    <div v-if="image" class="row">
      <div class="col-12">
        <img :alt="image.name" :src="imageUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppLoading from '@/components/AppLoading';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import ButtonGroup from '@/components/ButtonGroup';
import PageHeader from '@/components/PageHeader';

export default {
  name: 'project-image',
  components: {
    AppButton,
    AppLoading,
    BreadcrumbNav,
    ButtonGroup,
    PageHeader,
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
      return `https://res.cloudinary.com/carnold/image/upload/w_1200/${this.image.fileName}.${this.image.format}`;
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

      const response = await this.$store.dispatch('images/remove', this.image);

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
