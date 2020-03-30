<template>
  <div class="view-wrapper">
    <app-loading v-if="isSaving === true"></app-loading>
    <view-header
      description="Create a project to save images, links and notes."
      :on-back="onCancel"
      section-name="Project"
      title="Create Project"
    ></view-header>
    <div v-if="isSaving === false">
      <form class="form" @submit.prevent="create">
        <a-action-bar>
          <template v-slot:controls>
            <a-button @click="onCancel">
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
              Create
            </a-button>
          </template>
        </a-action-bar>
        <text-input v-model="name" label="Name" name="name"></text-input>
        <text-input
          v-model="description"
          label="Description"
          name="description"
        ></text-input>
      </form>
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader';
import AButton from '@/components/AButton';
import AActionBar from '@/components/AActionBar';
import AppLoading from '@/components/AppLoading';
import TextInput from '@/components/TextInput';

export default {
  name: 'project-edit',
  components: {
    AActionBar,
    AButton,
    AppLoading,
    TextInput,
    ViewHeader,
  },
  data() {
    return {
      description: '',
      isSaving: false,
      name: '',
    };
  },
  methods: {
    async create() {
      this.isSaving = true;

      const data = {
        description: this.description,
        name: this.name,
      };
      const response = await this.$store.dispatch('projects/create', data);

      if (response.success) {
        this.$router.push(`/projects/${response.project.id}`);
      } else {
        console.error(response.message);
      }
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
</style>
