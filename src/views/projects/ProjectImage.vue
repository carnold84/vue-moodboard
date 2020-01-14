<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <page-header>
          <template v-slot:content-left>
            <breadcrumb-nav>
              <router-link to="/projects">Projects</router-link>
              <span class="divider">/</span>
              <router-link :to="{ name: 'project', params: { id: project.id }}">{{project.name}}</router-link>
              <span class="divider">/</span>
              <h1 class="title">{{image.name}}</h1>
            </breadcrumb-nav>
            <h1 class="view-title">{{image.name}}</h1>
          </template>
          <template v-slot:content-right>
            <app-button @click="onRemove" :is-primary="true">Remove from {{ project.name }}</app-button>
            <app-button @click="onDelete" :is-primary="true">Delete</app-button>
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
import AppButton from "@/components/AppButton";
import AppLoading from "@/components/AppLoading";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PageHeader from "@/components/PageHeader";

export default {
  name: "project-image",
  components: {
    AppButton,
    AppLoading,
    BreadcrumbNav,
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
    imageUrl() {
      return `https://res.cloudinary.com/carnold/image/upload/w_1200/${this.image.fileName}.${this.image.format}`;
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
    async onDelete() {
      this.isRemoving = true;

      const response = await this.$store.dispatch("images/delete", this.image);

      if (response.success) {
        this.$router.push(`/projects/${this.id}`);
      } else {
        console.error(response.message);
      }
    },
    async onRemove() {
      this.isRemoving = true;

      const response = await this.$store.dispatch("images/remove", this.image);

      if (response.success) {
        this.$router.push(`/projects/${this.id}`);
      } else {
        console.error(response.message);
      }
    }
  }
};
</script>

<style lang="scss">
</style>
