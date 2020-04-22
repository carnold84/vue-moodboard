<template>
  <view-container>
    <view-header title="Projects">
      <template v-slot:controls>
        <a-select v-if="options" alignMenu="right" :items="options" />
      </template>
    </view-header>
    <a-loading v-if="projects === undefined" />
    <div v-if="projects && projects.length === 0">No Projects</div>
    <div v-if="projects && projects.length > 0">
      <div v-for="project in projects" :key="project.id">
        <a-image-link
          :title="project.name"
          :to="{ name: 'project', params: { id: project.id } }"
        ></a-image-link>
      </div>
    </div>
  </view-container>
</template>

<script>
import ALoading from 'aura-design-system/src/ALoading';

import AImageLink from '@/components/AImageLink';
import ASelect from '@/components/ASelect';
import ViewContainer from '@/components/ViewContainer';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'projects',
  components: {
    AImageLink,
    ALoading,
    ASelect,
    ViewContainer,
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
