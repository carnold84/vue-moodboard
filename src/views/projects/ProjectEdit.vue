<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <page-header>
          <template v-slot:content-left>
            <h1 class="view-title">Create Project</h1>
          </template>
        </page-header>
      </div>
    </div>
    <app-loading v-if="isSaving === true"></app-loading>
    <div v-if="isSaving === false" class="row">
      <div class="col-12">
        <form class="form" @submit.prevent="create">
          <text-input v-model="name" label="Name" name="name"></text-input>
          <text-input v-model="description" label="Description" name="description"></text-input>
          <button-group align="right">
            <app-button
              style="width: 160px;"
              to="/projects"
            >Cancel</app-button>
            <app-button
              :isPrimary="true"
              style="width: 160px;"
              type="submit"
            >Create Project</app-button>
          </button-group>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppLoading from '@/components/AppLoading';
import ButtonGroup from '@/components/ButtonGroup';
import PageHeader from '@/components/PageHeader';
import TextInput from '@/components/TextInput';

export default {
  name: 'project-edit',
  components: {
    AppButton,
    AppLoading,
    ButtonGroup,
    PageHeader,
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
        this.$router.push('/projects');
      } else {
        console.error(response.message);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
