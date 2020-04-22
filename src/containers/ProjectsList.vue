<template>
  <ul class="projects-list">
    <li v-for="project of projects" :key="project.id" class="project-item">
      <div class="control">
        <a-loading v-if="areLinking[project.id]" diameter="20" />
        <a-button
          v-if="!areLinking[project.id] && !isLinked(project)"
          @click="onLink(project)"
        >
          <template v-slot:icon-left>
            <a-add-icon />
          </template>
        </a-button>
        <a-button
          v-if="!areLinking[project.id] && isLinked(project)"
          @click="onUnlink(project)"
        >
          <template v-slot:icon-left>
            <a-remove-icon />
          </template>
        </a-button>
      </div>
      {{ project.name }}
    </li>
  </ul>
</template>

<script>
import AButton from 'aura-design-system/src/AButton';
import ALoading from 'aura-design-system/src/ALoading';
import AAddIcon from 'aura-design-system/src/icons/AAddIcon';
import ARemoveIcon from 'aura-design-system/src/icons/ARemoveIcon';

export default {
  name: 'projects-list',
  components: {
    AAddIcon,
    AButton,
    ALoading,
    ARemoveIcon,
  },
  computed: {
    projects() {
      return this.$store.getters['projects/list'];
    },
  },
  methods: {
    isLinked(project) {
      if (this.image) {
        return project.imageIds.includes(this.image.id);
      } else if (this.link) {
        return project.linkIds.includes(this.link.id);
      }
    },
    onLink(project) {
      this.$emit('link', project);
    },
    onUnlink(project) {
      this.$emit('unlink', project);
    },
  },
  props: {
    areLinking: {
      type: Object,
    },
    image: {
      type: Object,
    },
    link: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.projects-list {
  width: 100%;
}

.project-item {
  align-items: center;
  border-bottom: 1px solid var(--theme3);
  color: var(--text1);
  display: grid;
  grid-template-columns: 40px 1fr;
  font-size: 1em;
  font-weight: 600;
  line-height: 1.2em;
  padding: 15px 22px;
  width: 100%;
}

.control {
  height: 36px;
  position: relative;
  width: 36px;
}
</style>
