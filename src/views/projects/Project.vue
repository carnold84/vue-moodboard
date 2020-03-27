<template>
  <div class="view-wrapper">
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
    <div  v-if="project && !isDeleting" class="row">
      <div class="col-12">
        <a-tab-bar :tabs="tabs">
          <template v-slot:controls>
            <a-button
              :isPrimary="true"
              :to="{ name: 'project-add-image', params: { id: project.id }}"
            >
              <svg
                height="20"
                style="margin: 0 5px 0 0;"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              <span>Add Image</span>
            </a-button>
          </template>
        </a-tab-bar>
      </div>
    </div>
    <div v-if="project && !isDeleting && images === undefined" class="row">
      <app-loading></app-loading>
    </div>
    <div
      v-if="project && !isDeleting && (images && images.length === 0)"
      class="row content-row"
    >
      <div 
        class="col-12"
      >
        No images.
      </div>
    </div>
    <div
      v-if="project && !isDeleting && (images && images.length > 0)"
      class="row content-row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
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
import AButton from '@/components/AButton';
import AppLoading from '@/components/AppLoading';
import AppPicture from '@/components/AppPicture';
import ATabBar from '@/components/ATabBar';
import AViewHeader from '@/components/AViewHeader';

export default {
  name: 'project',
  components: {
    AImageLink,
    AButton,
    AppLoading,
    ATabBar,
    AViewHeader,
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
    tabs() {
      return [
        {
          id: 'images-tab',
          label: 'Images',
          to: {
            name: 'project',
            params: {
              id: this.project ? this.project.id : null,
              tab: 'images',
            },
          },
        },
      ];
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

.panel {
  flex-grow: 1;
}
</style>
