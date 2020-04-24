<template>
  <view-container>
    <a-loading v-if="project === undefined || isDeleting" />
    <div v-if="project && !isDeleting">
      <view-header
        :description="project.description"
        sectionName="Project"
        :title="project.name"
      >
        <template v-slot:controls>
          <a-button @click="onEdit">
            <template v-slot:icon-left>
              <a-create-icon height="16" width="16" />
            </template>
            <span>Edit</span>
          </a-button>
          <a-select v-if="options" alignMenu="right" :items="options" />
        </template>
      </view-header>
    </div>
    <div v-if="project && !isDeleting">
      <div class="tabs">
        <a-action-bar>
          <template v-slot:controls-left>
            <router-link
              v-for="tab of tabs"
              :key="tab.id"
              :to="tab.to"
              style="text-decoration: none;"
            >
              <a-tab :is-active="currentTabId === tab.id" :label="tab.label" />
            </router-link>
          </template>
          <template v-slot:controls-right>
            <a-button
              v-if="currentTabId === 'images'"
              :isPrimary="true"
              @click="onAddImage"
            >
              <template v-slot:icon-left>
                <a-add-icon />
              </template>
              <span>Add Image</span>
            </a-button>
            <a-button
              v-if="currentTabId === 'links'"
              :isPrimary="true"
              @click="onAddLink"
            >
              <template v-slot:icon-left>
                <a-add-icon />
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
import AActionBar from 'aura-design-system/src/AActionBar';
import AButton from 'aura-design-system/src/AButton';
import ALoading from 'aura-design-system/src/ALoading';
import AMessagePanel from 'aura-design-system/src/AMessagePanel';
import APicture, { TYPES } from 'aura-design-system/src/APicture';
import ATab from 'aura-design-system/src/ATab';
import AAddIcon from 'aura-design-system/src/icons/AAddIcon';
import ACreateIcon from 'aura-design-system/src/icons/ACreateIcon';
import { TOAST_TYPES } from 'aura-design-system/src/AToast';

import AImageGrid from '@/components/AImageGrid';
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
    ACreateIcon,
    ALoading,
    ASelect,
    ATab,
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
            callback: this.onDelete,
            id: 'delete',
            label: `Delete ${this.project.name}`,
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
    onAddImage() {
      this.$store.dispatch('modals/add', {
        project: this.project,
        title: `Add An Image To ${this.project.name}`,
        type: MODAL_TYPES.ADD_IMAGE,
      });
    },
    onAddLink() {
      this.$store.dispatch('modals/add', {
        project: this.project,
        title: `Add A Link To ${this.project.name}`,
        type: MODAL_TYPES.ADD_LINK,
      });
    },
    async onConfirmDelete() {
      this.isDeleting = true;

      let name = this.project.name;

      const response = await this.$store.dispatch(
        'projects/delete',
        this.project
      );

      if (response.success) {
        this.$store.dispatch('toasts/add', {
          text: `"${name}" was deleted.`,
          timeout: 4000,
          title: 'Project Deleted',
          type: TOAST_TYPES.SUCCESS,
        });
        this.$router.push('/');
      } else {
        this.$store.dispatch('toasts/add', {
          text: `"${name}" couldn't be deleted.`,
          title: 'Error',
          type: TOAST_TYPES.ERROR,
        });
        console.error(response.message);
      }
    },
    onDelete() {
      this.$store.dispatch('modals/add', {
        onConfirm: this.onConfirmDelete,
        text: `Are you sure you want to delete ${this.project.name}?`,
        title: 'Delete Project?',
        type: MODAL_TYPES.CONFIRM_DIALOG,
      });
    },
    onEdit() {
      this.$store.dispatch('modals/add', {
        project: this.project,
        title: `Edit ${this.project.name}`,
        type: MODAL_TYPES.ADD_PROJECT,
      });
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
