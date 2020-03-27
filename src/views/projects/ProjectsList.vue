<template>
  <div class="view-container">
    <div class="row">
      <div class="col-12">
        <a-view-header
          :options="options"
          title="Projects"
        >
        </a-view-header>
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
import AViewHeader from '@/components/AViewHeader';
import AImageLink from '@/components/AImageLink';
import AppLoading from '@/components/AppLoading';

export default {
  name: 'projects',
  components: {
    AImageLink,
    AViewHeader,
    AppLoading,
  },
  computed: {
    projects() {
      return this.$store.getters['projects/projects'];
    },
  },
  data() {
    return {
      options: [
        {
          callback: this.onCreateProject,
          id: 'create-project',
          label: 'New',
        },
      ],
    };
  },
  methods: {
    onCreateProject() {
      this.$router.push('/projects/create');
    },
  },
};
</script>

<style lang="scss">
.a-image-link {
  margin: 0 0 40px;
}
</style>
