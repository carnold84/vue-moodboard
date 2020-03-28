<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <a-view-header title="Create Project"></a-view-header>
      </div>
    </div>
    <app-loading v-if="isSaving === true"></app-loading>
    <div v-if="isSaving === false" class="row">
      <div class="col-12">
        <form class="form" @submit.prevent="create">
          <text-input v-model="name" label="Name" name="name"></text-input>
          <text-input v-model="description" label="Description" name="description"></text-input>
          <button-group align="right">
            <app-button style="width: 160px;" to="/">Cancel</app-button>
            <app-button :isPrimary="true" style="width: 160px;" type="submit">Create Project</app-button>
          </button-group>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AViewHeader from '@/components/AViewHeader';
import AppButton from '@/components/AppButton';
import AppLoading from '@/components/AppLoading';
import ButtonGroup from '@/components/ButtonGroup';
import TextInput from '@/components/TextInput';

export default {
  name: 'project-edit',
  components: {
    AViewHeader,
    AppButton,
    AppLoading,
    ButtonGroup,
    TextInput,
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
  },
};
</script>

<style lang="scss">
</style>
