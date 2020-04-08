<template>
  <view-container>
    <app-loading v-if="isSaving === true"></app-loading>
    <form v-if="isSaving === false" class="form" @submit.prevent="create">
      <view-header
        description="Create a project to save images, links and notes."
        :on-back="onCancel"
        section-name="Project"
        title="Create Project"
      >
        <template v-slot:controls>
          <a-button @click="onCancel">
            <template v-slot:icon-left>
              <a-close-icon />
            </template>
            Cancel
          </a-button>
          <a-button :isPrimary="true" type="submit">
            <template v-slot:icon-left>
              <a-check-icon />
            </template>
            Create
          </a-button>
        </template>
      </view-header>
      <div class="form">
        <text-input v-model="name" label="Name" name="name"></text-input>
        <text-input
          v-model="description"
          label="Description"
          name="description"
        ></text-input>
      </div>
    </form>
  </view-container>
</template>

<script>
import AButton from '@/components/AButton';
import ACheckIcon from '@/components/icons/ACheckIcon';
import ACloseIcon from '@/components/icons/ACloseIcon';
import AppLoading from '@/components/AppLoading';
import TextInput from '@/components/TextInput';
import ViewContainer from '@/components/ViewContainer';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'project-edit',
  components: {
    ACheckIcon,
    ACloseIcon,
    AButton,
    AppLoading,
    TextInput,
    ViewContainer,
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
