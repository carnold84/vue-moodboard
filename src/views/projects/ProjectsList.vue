<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <page-header>
          <template v-slot:content-left>
            <h1 class="view-title">Projects</h1>
          </template>
          <template v-slot:content-right>
            <app-link :is-primary="true" to="/projects/create">New Project</app-link>
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
          <h3>
            <router-link :to="{ name: 'project', params: { id: project.id }}">{{project.name}}</router-link>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLink from "@/components/AppLink";
import AppLoading from "@/components/AppLoading";
import PageHeader from "@/components/PageHeader";

export default {
  name: "projects",
  components: {
    AppLink,
    AppLoading,
    PageHeader
  },
  computed: {
    projects() {
      return this.$store.getters["projects/projects"];
    }
  },
  mounted() {
    this.$store.dispatch("projects/getAllProjects");
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
