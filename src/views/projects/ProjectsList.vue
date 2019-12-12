<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <page-header>
          <template v-slot:content-left>
            <h1 class="view-title">Projects</h1>
          </template>
          <template v-slot:content-right>
            <app-button :is-primary="true" to="/projects/create" type="router-link">New Project</app-button>
          </template>
        </page-header>
      </div>
    </div>
    <app-loading v-if="projects === undefined"></app-loading>
    <div v-if="projects && projects.length === 0">No Projects</div>
    <div v-if="projects && projects.length > 0" class="row">
      <div v-for="project in projects" :key="project.id" class="col-3">
        <div class="project">
          <img height="200" width="100%" />
          <h3>{{project.name}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
import AppLoading from "@/components/AppLoading";
import PageHeader from "@/components/PageHeader";

export default {
  name: "projects",
  components: {
    AppButton,
    AppLoading,
    PageHeader
  },
  computed: {
    projects() {
      return this.$store.getters["projects/projects"];
    }
  },
  mounted() {
    if (!this.projects) {
      this.$store.dispatch("projects/getAllProjects");
    }
  }
};
</script>

<style lang="scss">
.project {
  margin: 0 0 20px;

  h3 {
    font-weight: 300;
  }

  img {
    background-color: aquamarine;
    height: 200px;
    width: 100%;
  }
}
</style>
