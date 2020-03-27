<template>
  <div class="view-container">
    <app-loading v-if="project === undefined || isDeleting"></app-loading>
    <div v-if="project && !isDeleting" class="row">
      <div class="col-12">
        <a-view-header
          :description="project.description"
          :options="options"
          sectionName="Project"
          :title="project.name"
        >
        </a-view-header>
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
import AViewHeader from '@/components/AViewHeader';
import AppLoading from '@/components/AppLoading';
import AppPicture from '@/components/AppPicture';

export default {
  name: 'project',
  components: {
    AImageLink,
    AViewHeader,
    AppLoading,
  },
  computed: {
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
      options: [
        {
          callback: this.onDelete,
          id: 'delete',
          label: 'Delete',
        },
        {
          callback: this.onAddImage,
          id: 'add-image',
          label: 'Add Image',
        },
      ],
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
        this.$router.push('/');
      } else {
        console.error(response.message);
      }
    },
    onAddImage() {
      this.$router.push({ name: 'project-add-image', params: { id: this.project.id }});
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
