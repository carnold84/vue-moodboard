<template>
  <div class="view-wrapper">
    <app-loading v-if="!project || isSaving === true"></app-loading>
    <view-header
      v-if="project"
      :description="projectDescription"
      :on-back="backUrl"
      section-name="Project"
      :title="title"
    ></view-header>
    <div v-if="project && isSaving === false">
      <form class="form" @submit.prevent="create">
        <a-action-bar v-if="project">
          <template v-slot:controls>
            <a-button :to="{ name: 'project', params: { id: project.id } }">
              <a-close-icon></a-close-icon>
              Cancel
            </a-button>
            <a-button :isPrimary="true" type="submit">
              <a-check-icon></a-check-icon>
              Add Link
            </a-button>
          </template>
        </a-action-bar>
        <text-input v-model="name" label="Name" name="name"></text-input>
        <text-input
          v-model="description"
          label="Description"
          name="description"
        ></text-input>
        <text-input v-model="url" label="Url" name="url"></text-input>
      </form>
    </div>
  </div>
</template>

<script>
import AActionBar from '@/components/AActionBar';
import AButton from '@/components/AButton';
import ACheckIcon from '@/components/icons/ACheckIcon';
import ACloseIcon from '@/components/icons/ACloseIcon';
import AppLoading from '@/components/AppLoading';
import TextInput from '@/components/TextInput';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'project-add-link',
  components: {
    AActionBar,
    AButton,
    ACheckIcon,
    ACloseIcon,
    AppLoading,
    TextInput,
    ViewHeader,
  },
  computed: {
    backUrl() {
      return {
        name: 'project',
        params: { id: this.project.id },
        query: { tab: 'links' },
      };
    },
    id() {
      return this.$route.params.id;
    },
    project() {
      return this.$store.getters['projects/project'](this.id);
    },
    projectDescription() {
      return `Create a link and add it to ${this.project.name}`;
    },
    title() {
      return 'Add Link';
    },
  },
  data() {
    return {
      description: '',
      isSaving: false,
      name: '',
      url: '',
    };
  },
  methods: {
    async create() {
      this.isSaving = true;

      const data = {
        description: this.description,
        projectId: this.id,
        name: this.name,
        url: this.url,
      };
      const response = await this.$store.dispatch('links/create', data);

      if (response.success) {
        this.$router.push(this.backUrl);
      } else {
        console.error(response.message);
      }
    },
  },
};
</script>

<style lang="scss"></style>
