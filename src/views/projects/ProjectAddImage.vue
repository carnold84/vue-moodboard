<template>
  <div class="view-wrapper">
    <app-loading v-if="!project || isSaving === true"></app-loading>
    <view-header
      v-if="project"
      :description="projectDescription"
      sectionName="Project"
      :title="title"
    ></view-header>
    <a-action-bar v-if="project">
      <template v-slot:controls>
        <a-button :to="{ name: 'project', params: { id: project.id } }">
          <svg
            height="20"
            style="margin: 0 5px 0 0;"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          Cancel
        </a-button>
        <a-button :isPrimary="true" type="submit">
          <svg
            height="20"
            style="margin: 0 5px 0 0;"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
          Add Image
        </a-button>
      </template>
    </a-action-bar>
    <div v-if="project && isSaving === false">
      <form class="form" @submit.prevent="create">
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
import AppLoading from '@/components/AppLoading';
import TextInput from '@/components/TextInput';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'project-add-image',
  components: {
    AActionBar,
    AButton,
    AppLoading,
    TextInput,
    ViewHeader,
  },
  computed: {
    projectDescription() {
      return `Create an image and add it to ${this.project.name}`;
    },
    id() {
      return this.$route.params.id;
    },
    project() {
      return this.$store.getters['projects/project'](this.id);
    },
    title() {
      return 'Add Image';
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
      const response = await this.$store.dispatch('images/create', data);

      if (response.success) {
        this.$router.push(`/projects/${this.id}`);
      } else {
        console.error(response.message);
      }
    },
  },
};
</script>

<style lang="scss"></style>
