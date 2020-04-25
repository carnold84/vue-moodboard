<template>
  <view-container>
    <a-loading v-if="isSaving === true" />
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
        <a-text-field v-model="name" label="Name" name="name" />
        <a-text-field
          v-model="description"
          label="Description"
          name="description"
        />
      </div>
    </form>
  </view-container>
</template>

<script>
import AButton from 'aura-design-system/src/AButton';
import ALoading from 'aura-design-system/src/ALoading';
import ACheckIcon from 'aura-design-system/src/icons/ACheckIcon';
import ACloseIcon from 'aura-design-system/src/icons/ACloseIcon';
import ATextField from 'aura-design-system/src/ATextField';

import ViewContainer from '@/components/ViewContainer';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'project-edit',
  components: {
    ACheckIcon,
    ACloseIcon,
    AButton,
    ALoading,
    ATextField,
    ViewContainer,
    ViewHeader,
  },
  data() {
    return {
      description: '',
      errors: {
        name: undefined,
      },
      isSaving: false,
      name: '',
    };
  },
  methods: {
    async create() {
      this.isSaving = true;

      this.errors.name = undefined;

      if (this.name === '') {
        this.errors.name = 'Name is required.';
        return;
      }

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
