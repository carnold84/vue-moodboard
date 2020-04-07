<template>
  <div class="image-list">
    <app-loading v-if="isLoading" />
    <a-message-panel
      v-if="!isLoading && images.length === 0"
      text="You haven't got any images."
    >
      <a-button
        :isPrimary="true"
        :to="
          project
            ? { name: 'project-add-image', params: { id: project.id } }
            : { name: 'images-add-image' }
        "
      >
        <template v-slot:icon-left>
          <a-add-icon />
        </template>
        <span>Add One!</span>
      </a-button>
    </a-message-panel>
    <a-image-grid v-if="!isLoading && images.length > 0" :images="images" />
  </div>
</template>

<script>
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import AImageGrid from '@/components/AImageGrid';
import AppLoading from '@/components/AppLoading';
import AMessagePanel from '@/components/AMessagePanel';

export default {
  name: 'image-list',
  components: {
    AAddIcon,
    AButton,
    AppLoading,
    AImageGrid,
    AMessagePanel,
  },
  computed: {
    images() {
      const initialImages = this.$store.getters['images/findAll'](
        this.imageIds
      );

      let images = [];

      initialImages.forEach(element => {
        if (element) {
          const { id, name } = element;
          images.push({
            id,
            imageUrl: this.thumbUrl(element),
            title: name,
            to: this.project
              ? {
                  name: 'project-image',
                  params: {
                    id: this.project.id,
                    imageId: id,
                  },
                }
              : {
                  name: 'image',
                  params: { id },
                },
          });
        }
      });
      return images;
    },
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    async load() {
      if (this.imageIds && this.imageIds.length === 0) {
        this.isLoading = false;
        return;
      }
      this.isLoading = true;
      const images = await this.$store.dispatch('images/load', this.imageIds);
      this.isLoading = false;
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
  mounted() {
    this.load();
  },
  props: {
    imageIds: {
      default: null,
      type: Array,
    },
    project: {
      type: Object,
    },
  },
  watch: {
    imageIds: 'load',
  },
};
</script>

<style scoped lang="scss">
.image-list {
  flex-grow: 1;
  min-height: 100%;
  position: relative;
}
</style>
