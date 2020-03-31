<template>
  <div class="view-wrapper">
    <view-header :options="options" title="Projects"></view-header>
    <app-loading v-if="projects === undefined"></app-loading>
    <div v-if="projects && projects.length === 0">No Projects</div>
    <div v-if="projects && projects.length > 0">
      <div v-for="project in projects" :key="project.id">
        <a-image-link
          :title="project.name"
          :to="{ name: 'project', params: { id: project.id } }"
        ></a-image-link>
      </div>
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader';
import AImageLink from '@/components/AImageLink';
import AppLoading from '@/components/AppLoading';

export default {
  name: 'projects',
  components: {
    AImageLink,
    AppLoading,
    ViewHeader,
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
