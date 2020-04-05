<template>
  <div class="view-wrapper">
    <app-loading v-if="project === undefined || isDeleting"></app-loading>
    <div v-if="project && !isDeleting">
      <view-header
        :description="project.description"
        :options="options"
        sectionName="Project"
        :title="project.name"
      ></view-header>
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
              <a-add-icon></a-add-icon>
              <span>Add Image</span>
            </a-button>
            <a-button
              v-if="currentTabId === 'links'"
              :isPrimary="true"
              :to="{ name: 'project-add-link', params: { id: project.id } }"
            >
              <a-add-icon></a-add-icon>
              <span>Add Link</span>
            </a-button>
          </template>
        </a-action-bar>
      </div>
    </div>
    <div class="view-content">
      <div v-if="currentTabId === 'images'">
        <images-container v-if="project" :imageIds="project.imageIds" />
      </div>
      <div v-if="currentTabId === 'links'">
        <div v-if="project && !isDeleting && links === undefined">
          <app-loading></app-loading>
        </div>
        <a-message-panel
          v-if="project && !isDeleting && links && links.length === 0"
          text="You haven't got any links."
        >
          <a-button
            :isPrimary="true"
            :to="{ name: 'project-add-link', params: { id: project.id } }"
          >
            <a-add-icon></a-add-icon>
            <span>Add One!</span>
          </a-button>
        </a-message-panel>
        <links-list
          v-if="project && !isDeleting && links && links.length > 0"
          :links="links"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AActionBar from '@/components/AActionBar';
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import AImageGrid from '@/components/AImageGrid';
import AMessagePanel from '@/components/AMessagePanel';
import APicture from '@/components/APicture';
import AppLoading from '@/components/AppLoading';
import ImagesContainer from '@/containers/Images';
import LinksList from '@/components/LinksList';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'project',
  components: {
    AActionBar,
    AAddIcon,
    AButton,
    AMessagePanel,
    AppLoading,
    ImagesContainer,
    LinksList,
    ViewHeader,
  },
  computed: {
    currentTabId() {
      return this.$route.query.tab || 'images';
    },
    id() {
      return this.$route.params.id;
    },
    links() {
      if (this.project) {
        let links = this.$store.getters['links/findAll'](this.project.linkIds);

        return links.filter(element => {
          return element !== undefined;
        });
      } else {
        return undefined;
      }
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
    async onDeleteProject() {
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
    async onDeleteLink(id) {
      this.isDeleting = true;

      const link = this.links.filter(element => {
        return element.id === id;
      })[0];

      const response = await this.$store.dispatch('links/delete', link);

      if (response.success) {
        this.isDeleting = false;
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
}

.tabs {
  margin: 0 0 20px;
}
</style>
