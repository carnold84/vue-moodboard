<template>
  <div class="add-image-form">
    <view-header
      :description="subTitle"
      :on-back="backUrl"
      :title="title"
    ></view-header>
    <div class="content">
      <app-loading v-if="isSaving" />
      <form v-if="!isSaving" class="form" @submit.prevent="create">
        <a-action-bar>
          <template v-slot:controls>
            <a-button :to="backUrl">
              <a-close-icon></a-close-icon>
              Cancel
            </a-button>
            <a-button :isPrimary="true" type="submit">
              <a-check-icon></a-check-icon>
              Add Image
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
  name: 'add-image-form',
  components: {
    AActionBar,
    AButton,
    ACheckIcon,
    ACloseIcon,
    AppLoading,
    TextInput,
    ViewHeader,
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

      let data = {
        description: this.description,
        name: this.name,
        url: this.url,
      };

      if (this.project) {
        data.projectId = this.project.id;
      }

      const response = await this.$store.dispatch('images/create', data);

      if (response.success) {
        this.$router.push(this.backUrl);
      } else {
        console.error(response.message);
      }
    },
  },
  props: {
    backUrl: {
      type: [Object, String],
    },
    project: {
      type: Object,
    },
    subTitle: {
      type: String,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.add-image-form {
  position: relative;
}

.content {
  flex-grow: 1;
  position: relative;
}
</style>
