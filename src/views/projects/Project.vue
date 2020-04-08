<template>
  <view-container>
    <app-loading v-if="project === undefined || isDeleting"></app-loading>
    <div v-if="project && !isDeleting">
      <view-header
        :description="project.description"
        sectionName="Project"
        :title="project.name"
      >
        <template v-slot:controls>
          <a-select v-if="options" alignMenu="right" :items="options" />
        </template>
      </view-header>
    </div>
    <div v-if="project && !isDeleting">
      <div class="tabs">
        <a-action-bar :currentTabId="currentTabId" :tabs="tabs">
          <template v-slot:controls>
            <a-button
              v-if="currentTabId === 'images'"
              :isPrimary="true"
              :to="{ name: 'project-add-image', params: { id: project.id } }"
            >
              <template v-slot:icon-left>
                <a-add-icon></a-add-icon>
              </template>
              <span>Add Image</span>
            </a-button>
            <a-button
              v-if="currentTabId === 'links'"
              :isPrimary="true"
              :to="{ name: 'project-add-link', params: { id: project.id } }"
            >
              <template v-slot:icon-left>
                <a-add-icon></a-add-icon>
              </template>
              <span>Add Link</span>
            </a-button>
          </template>
        </a-action-bar>
      </div>
    </div>
    <div v-if="project && !isDeleting" class="view-content">
      <div v-if="currentTabId === 'images'" class="panel">
        <image-list :imageIds="project.imageIds" :project="project" />
      </div>
      <div v-if="currentTabId === 'links'" class="panel">
        <link-list :linkIds="project.linkIds" :project="project" />
      </div>
    </div>
  </view-container>
</template>

<script>
import AActionBar from '@/components/AActionBar';
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import AImageGrid from '@/components/AImageGrid';
import AMessagePanel from '@/components/AMessagePanel';
import APicture from '@/components/APicture';
import AppLoading from '@/components/AppLoading';
import ASelect from '@/components/ASelect';
import ImageList from '@/containers/ImageList';
import LinkList from '@/containers/LinkList';
import { MODAL_TYPES } from '@/containers/ModalManager';
import ViewContainer from '@/components/ViewContainer';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'project',
  components: {
    AActionBar,
    AAddIcon,
    AButton,
    AppLoading,
    ASelect,
    ImageList,
    LinkList,
    ViewContainer,
    ViewHeader,
  },
  computed: {
    currentTabId() {
      return this.$route.query.tab || 'images';
    },
    id() {
      return this.$route.params.id;
    },
    options() {
      if (this.project) {
        return [
          {
            callback: this.onDeleteProject,
            id: 'delete',
            label: 'Delete',
          },
        ];
      }

      return undefined;
    },
    project() {
      return this.$store.getters['projects/find'](this.id);
    },
    tabs() {
      return [
        {
          id: 'images',
          label: 'Images',
          to: {
            name: 'project',
            params: {
              id: this.project ? this.project.id : null,
            },
            query: { tab: 'images' },
          },
        },
        {
          id: 'links',
          label: 'Links',
          to: {
            name: 'project',
            params: {
              id: this.project ? this.project.id : null,
            },
            query: { tab: 'links' },
          },
        },
      ];
    },
  },
  data() {
    return {
      isDeleting: false,
    };
  },
  methods: {
    onDeleteProject() {
      this.$store.dispatch('modals/open', {
        name: MODAL_TYPES.CONFIRM_DIALOG,
        props: {
          onConfirm: this.onConfirmDelete,
          text: `Are you sure you want to delete ${this.project.name}?`,
          title: 'Delete Project?',
        },
      });
    },
    async onConfirmDelete() {
      this.isDeleting = true;

      const response = await this.$store.dispatch(
        'projects/delete',
        this.project
      );

      if (response.success) {
        this.$router.push('/');
      } else {
        console.error(response.message);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.panel {
  flex-grow: 1;
  position: relative;
}

.tabs {
  margin: 0 0 20px;
}
</style>
