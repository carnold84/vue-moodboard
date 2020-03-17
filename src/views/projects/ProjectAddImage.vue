<template>
  <div class="view-container">
    <app-loading v-if="!project || isSaving === true"></app-loading>
    <div v-if="project" class="row">
      <div class="col-12">
        <breadcrumb-nav :items="breadcrumb"></breadcrumb-nav>
        <page-header>
          <template v-slot:content-left>
            <h1 class="view-title">Add Image to {{ project.name }}</h1>
          </template>
        </page-header>
      </div>
    </div>
    <div v-if="project && isSaving === false" class="row">
      <div class="col-12">
        <form class="form" @submit.prevent="create">
          <text-input v-model="name" label="Name" name="name"></text-input>
          <text-input
            v-model="description"
            label="Description"
            name="description"
          ></text-input>
          <text-input v-model="url" label="Url" name="url"></text-input>
          <button-group align="right">
            <app-button
              style="width: 160px;"
              :to="{ name: 'project', params: { id: project.id }}"
              >Cancel</app-button
            >
            <app-button
              :isPrimary="true"
              style="width: 160px;"
              type="submit"
              >Add Image</app-button
            >
          </button-group>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppLoading from '@/components/AppLoading';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import ButtonGroup from '@/components/ButtonGroup';
import PageHeader from '@/components/PageHeader';
import TextInput from '@/components/TextInput';

export default {
  name: 'project-add-image',
  components: {
    AppButton,
    AppLoading,
    BreadcrumbNav,
    ButtonGroup,
    PageHeader,
    TextInput,
  },
  computed: {
    breadcrumb() { 
      return [
        {
          title: 'Projects',
          to: '/projects',
        },
        {
          title: this.project.name,
          to: `/projects/${this.id}`,
        },
        {
          title: 'Add Image',
        },
      ];
    },
    id() {
      return this.$route.params.id;
    },
    project() {
      return this.$store.getters['projects/project'](this.id);
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
