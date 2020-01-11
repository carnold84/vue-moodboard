<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <page-header>
          <template v-slot:content-left>
            <h1 v-if="image" class="view-title">{{ image.name }}</h1>
          </template>
          <template v-slot:content-right>
            <app-button @click="onRemove" :is-primary="true">Remove {{ image.name }} from {{ project.name }}</app-button>
          </template>
        </page-header>
      </div>
    </div>
    <app-loading v-if="isRemoving === true"></app-loading>
    <div v-if="image" class="row">
      <div class="col-12">
        <img :alt="image.name" :src="image.url" />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
import AppLoading from "@/components/AppLoading";
import PageHeader from "@/components/PageHeader";

export default {
  name: "project-image",
  components: {
    AppButton,
    AppLoading,
    PageHeader
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    imageId() {
      return this.$route.params.imageId;
    },
    image() {
      return this.$store.getters["images/image"](this.imageId);
    },
    project() {
      return this.$store.getters["projects/project"](this.id);
    }
  },
  data() {
    return {
      isRemoving: false
    };
  },
  methods: {
    async onRemove() {
      this.isRemoving = true;

      const response = await this.$store.dispatch("images/remove", this.imageId);

      if (response.success) {
        this.$router.push(`/projects/${this.id}`);
      } else {
        console.error(response.message);
      }
    }
  },
  mounted() {
    this.$store.dispatch("projects/getAllProjects");
  }
};
</script>

<style lang="scss">
</style>
