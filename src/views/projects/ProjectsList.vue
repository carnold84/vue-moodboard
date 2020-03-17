<template>
  <div class="view-container">
    <div class="row">
      <div class="col-12">
        <page-header>
          <template v-slot:content-left>
            <h1 class="view-title">Projects</h1>
          </template>
          <template v-slot:content-right>
            <app-button :is-primary="true" to="/projects/create"><span>New Project</span></app-button>
          </template>
        </page-header>
      </div>
    </div>
    <app-loading v-if="projects === undefined"></app-loading>
    <div v-if="projects && projects.length === 0">No Projects</div>
    <div 
      v-if="projects && projects.length > 0"
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
    >
      <div v-for="project in projects" :key="project.id" class="col">
        <a-image-link
          :title="project.name"
          :to="{ name: 'project', params: { id: project.id }}"
        ></a-image-link>
      </div>
    </div>
  </div>
</template>

<script>
import AImageLink from '@/components/AImageLink';
import AppButton from '@/components/AppButton';
import AppLoading from '@/components/AppLoading';
import PageHeader from '@/components/PageHeader';

export default {
  name: 'projects',
  components: {
    AImageLink,
    AppButton,
    AppLoading,
    PageHeader,
  },
  computed: {
    projects() {
      return this.$store.getters['projects/projects'];
    },
  },
};
</script>

<style lang="scss">
.a-image-link {
  margin: 0 0 40px;
}
</style>
