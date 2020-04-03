<template>
  <div class="view-wrapper">
    <view-header
      title="Images"
      description="View all your images."
    ></view-header>
    <a-action-bar>
      <template v-slot:controls>
        <a-button :isPrimary="true" :to="{ name: 'images-add-image' }">
          <a-add-icon></a-add-icon>
          <span>Add Image</span>
        </a-button>
      </template>
    </a-action-bar>
    <div class="view-content">
      <app-loading v-if="images === undefined"></app-loading>
      <a-message-panel
        v-if="images && images.length === 0"
        text="You haven't got any images."
      >
        <a-button :isPrimary="true" :to="{ name: 'images-add-image' }">
          <a-add-icon></a-add-icon>
          <span>Add One!</span>
        </a-button>
      </a-message-panel>
      <div v-if="images && images.length > 0">
        <a-image-grid
          v-if="images && images.length > 0"
          :images="images"
        ></a-image-grid>
      </div>
    </div>
  </div>
</template>

<script>
import AActionBar from '@/components/AActionBar';
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import AMessagePanel from '@/components/AMessagePanel';
import AImageGrid from '@/components/AImageGrid';
import AppLoading from '@/components/AppLoading';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'images',
  components: {
    AActionBar,
    AAddIcon,
    AButton,
    AImageGrid,
    AMessagePanel,
    AppLoading,
    ViewHeader,
  },
  computed: {
    images() {
      const initialImages = this.$store.getters['images/list'];

      let images = [];

      initialImages.forEach(element => {
        if (element) {
          const { id, name } = element;
          images.push({
            id,
            imageUrl: this.thumbUrl(element),
            title: name,
            to: {
              name: 'image',
              params: { id },
            },
          });
        }
      });

      return images;
    },
  },
  methods: {
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

<style lang="scss">
</style>
