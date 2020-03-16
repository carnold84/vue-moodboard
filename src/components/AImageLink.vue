<template>
  <router-link
    class="image-link"
    :to="to"
  >
    <app-picture class="image-link-picture" :height="imageHeight" :src="imageUrl" />
    <h3 v-if="title" class="image-link-title">{{title}}</h3>
  </router-link>
</template>

<script>
import AppPicture from '@/components/AppPicture';

export default {
  name: 'a-image-link',
  components: {
    AppPicture,
  },
  props: {
    imageHeight: {
      default: '200px',
      type: String,
    },
    imageUrl: {
      type: String,
    },
    title: {
      type: String,
    },
    to: {
      type: [Object, String],
    },
  },
};
</script>

<style scoped lang="scss">
.image-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:hover {
    .image-link-picture {
      outline: 3px solid var(--button__bg-color--primary);
    }

    .image-link-title {
      color: var(--button__bg-color--primary);
    }
  }
}

.image-link-picture {
  margin: 0 0 10px;
  outline: 1px solid #e3e3e3;
}

.image-link-title {
  color: #444444;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  font-weight: 700;
}
</style>
