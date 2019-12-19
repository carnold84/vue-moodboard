<template>
  <div class="container">
    <app-loading v-if="project === undefined || isDeleting"></app-loading>
    <div v-if="project && !isDeleting" class="row">
      <div class="col-12">
        <page-header>
          <template v-slot:content-left>
            <h1 class="view-title">{{project.name}}</h1>
          </template>
          <template v-slot:content-right>
            <app-button @click="onDelete" :is-primary="true">Delete</app-button>
            <app-link
              :to="{ name: 'project-add-image', params: { id: project.id }}"
              :is-primary="true"
            >Add Image</app-link>
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
    <div v-if="project && !isDeleting && (images && images.length > 0)" class="row">
      <div v-for="image in images" :key="image.id" class="col-3">{{image.name}}</div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
import AppLink from "@/components/AppLink";
import AppLoading from "@/components/AppLoading";
import PageHeader from "@/components/PageHeader";

export default {
  name: "project",
  components: {
    AppButton,
    AppLink,
    AppLoading,
    PageHeader
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    images() {
      console.log(this.$store.getters["images/imagesByProject"](this.id));
      return this.$store.getters["images/imagesByProject"](this.id);
    },
    project() {
      return this.$store.getters["projects/project"](this.id);
    }
  },
  data() {
    return {
      isDeleting: false
    };
  },
  methods: {
    async onDelete() {
      console.log("deleteProject");
      this.isDeleting = true;

      const response = await this.$store.dispatch(
        "projects/delete",
        this.project
      );

      if (response.success) {
        this.$router.push("/projects");
      } else {
        console.error(response.message);
      }
    }
  },
  mounted() {
    this.$store.dispatch("projects/getAllProjects");
    this.$store.dispatch("images/getImagesByProject", this.id);
  }
};
</script>

<style lang="scss">
</style>
