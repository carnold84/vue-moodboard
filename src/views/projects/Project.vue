<template>
  <div class="view-wrapper">
    <app-loading v-if="project === undefined || isDeleting"></app-loading>
    <div v-if="project && !isDeleting">
      <view-header
        :description="project.description"
        :options="options"
        sectionName="Project"
        :title="project.name"
      ></view-header>
    </div>
    <div v-if="project && !isDeleting">
      <div class="tabs">
        <a-action-bar :tabs="tabs">
          <template v-slot:controls>
            <a-button
              :isPrimary="true"
              :to="{ name: 'project-add-image', params: { id: project.id } }"
            >
              <a-add-icon></a-add-icon>
              <span>Add Image</span>
            </a-button>
          </template>
        </a-action-bar>
      </div>
    </div>
    <div class="view-content">
      <div v-if="project && !isDeleting && images === undefined">
        <app-loading></app-loading>
      </div>
      <a-message-panel
        v-if="project && !isDeleting && images && images.length === 0"
        text="You haven't got any images."
      >
        <a-button
          :isPrimary="true"
          :to="{ name: 'project-add-image', params: { id: project.id } }"
        >
          <a-add-icon></a-add-icon>
          <span>Add One!</span>
        </a-button>
      </a-message-panel>
      <a-image-grid
        v-if="project && !isDeleting && images && images.length > 0"
        :images="images"
      ></a-image-grid>
    </div>
  </div>
</template>

<script>
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import AImageGrid from '@/components/AImageGrid';
import AMessagePanel from '@/components/AMessagePanel';
import APicture from '@/components/APicture';
import AppLoading from '@/components/AppLoading';
import AActionBar from '@/components/AActionBar';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'project',
  components: {
    AAddIcon,
    AImageGrid,
    AButton,
    AMessagePanel,
    AppLoading,
    AActionBar,
    ViewHeader,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    images() {
      if (this.project) {
        let images = this.$store.getters['images/imagesById'](
          this.project.imageIds
        );

        if (images === undefined) {
          return images;
        }

        return images.map(element => {
          const { id, name } = element;
          return {
            id,
            imageUrl: this.thumbUrl(element),
            title: name,
            to: {
              name: 'project-image',
              params: {
                id: this.project.id,
                imageId: id,
              },
            },
          };
        });
      } else {
        return undefined;
      }
    },
    options() {
      if (this.project) {
        return [
          {
            callback: this.onDelete,
            id: 'delete',
            label: 'Delete',
          },
        ];
      }

      return undefined;
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
        const rootUrl = 'https://res.cloudinary.com/carnold/image/upload';
        return `${rootUrl}/w_260/${image.fileName}.${image.format}`;
      } else {
        return image.url;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.panel {
  flex-grow: 1;
}

.tabs {
  margin: 0 0 20px;
}
</style>
