<template>
  <view-container>
    <view-header title="Projects">
      <template v-slot:controls>
        <a-select
          v-if="options"
          alignMenu="right"
          :items="options"
          @select="onSelect"
        />
      </template>
    </view-header>
    <a-loading v-if="projects === undefined" />
    <div v-if="projects && projects.length === 0">No Projects</div>
    <a-grid v-if="projects && projects.length > 0">
      <router-link
        v-for="project in projects"
        :key="project.id"
        style="text-decoration: none;"
        :to="{
          name: 'project',
          params: {
            id: project.id
          }
        }"
      >
        <a-image-card :enable-hover="true" :title="project.name" />
      </router-link>
    </a-grid>
  </view-container>
</template>

<script>
import AGrid from 'aura-design-system/src/AGrid';
import AImageCard from 'aura-design-system/src/AImageCard';
import ALoading from 'aura-design-system/src/ALoading';
import ASelect from 'aura-design-system/src/ASelect';

import ViewContainer from '@/components/ViewContainer';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'projects',
  components: {
    AGrid,
    AImageCard,
    ALoading,
    ASelect,
    ViewContainer,
    ViewHeader,
  },
  computed: {
    projects() {
      return this.$store.getters['projects/list'];
    },
  },
  data() {
    return {
      options: [
        {
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
    onSelect(id) {
      switch (id) {
        case 'create-project':
          this.onCreateProject();
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.a-image-link {
  margin: 0 0 40px;
}
</style>
