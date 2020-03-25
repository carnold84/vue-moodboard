<template>
  <div class="view-container">
    <app-loading v-if="project === undefined || isDeleting"></app-loading>
    <div v-if="project && !isDeleting" class="row">
      <div class="col-12">
        <breadcrumb-nav :items="breadcrumb"></breadcrumb-nav>
      </div>
      <div class="col-12">
        <page-header>
          <template v-slot:content-left>
            <h1 class="view-title">{{project.name}}</h1>
          </template>
          <template v-slot:content-right>
            <button-group>
              <app-button @click="onDelete">Delete</app-button>
              <app-button
                :to="{ name: 'project-add-image', params: { id: project.id }}"
                :is-primary="true"
              >Add Image</app-button>
            </button-group>
          </template>
        </page-header>
      </div>
    </div>
    <div v-if="project && !isDeleting && images === undefined" class="row">
      <app-loading></app-loading>
    </div>
    <div v-if="project && !isDeleting && (images && images.length === 0)" class="row">
      <div class="col-12">No images.</div>
    </div>
    <div
      v-if="project && !isDeleting && (images && images.length > 0)"
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
    >
      <div v-for="image in images" :key="image.id" class="col">
        <a-image-link
          :imageUrl="thumbUrl(image)"
          :title="image.name"
          :to="{ name: 'project-image', params: { id: project.id, imageId: image.id }}"
        ></a-image-link>
      </div>
    </div>
  </div>
</template>

<script>
import AImageLink from '@/components/AImageLink';
import AppButton from '@/components/AppButton';
import AppLoading from '@/components/AppLoading';
import AppPicture from '@/components/AppPicture';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import ButtonGroup from '@/components/ButtonGroup';
import PageHeader from '@/components/PageHeader';

export default {
  name: 'project',
  components: {
    AImageLink,
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
        },
      ];
    },
    id() {
      return this.$route.params.id;
    },
    images() {
      if (this.project) {
        return this.$store.getters['images/imagesById'](this.project.imageIds);
      } else {
        return undefined;
      }
    },
    project() {
      return this.$store.getters['projects/project'](this.id);
    },
  },
  data() {
    return {
      isDeleting: false,
    };
  },
  methods: {
    async onDelete() {
      this.isDeleting = true;

      const response = await this.$store.dispatch(
        'projects/delete',
        this.project
      );

      if (response.success) {
        this.$router.push('/projects');
      } else {
        console.error(response.message);
      }
    },
    thumbUrl(image) {
      if (image.format) {
        return `https://res.cloudinary.com/carnold/image/upload/w_260/${image.fileName}.${image.format}`;
      } else {
        return image.url;
      }
    },
  },
};
</script>

<style lang="scss">
.a-image-link {
  margin: 0 0 40px;
}
</style>
