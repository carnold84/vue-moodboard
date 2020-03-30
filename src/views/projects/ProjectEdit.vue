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
              <a-close-icon></a-close-icon>
              Cancel
            </a-button>
            <a-button :isPrimary="true" type="submit">
              <a-check-icon></a-check-icon>
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
import AButton from '@/components/AButton';
import AActionBar from '@/components/AActionBar';
import ACheckIcon from '@/components/icons/ACheckIcon';
import ACloseIcon from '@/components/icons/ACloseIcon';
import AppLoading from '@/components/AppLoading';
import TextInput from '@/components/TextInput';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'project-edit',
  components: {
    AActionBar,
    ACheckIcon,
    ACloseIcon,
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
