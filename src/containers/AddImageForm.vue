<template>
  <div class="add-image-form content">
    <form class="content" @submit.prevent="create">
      <view-header :description="subTitle" :on-back="backUrl" :title="title">
        <template v-slot:controls>
          <a-button :to="backUrl">
            <template v-slot:icon-left>
              <a-close-icon />
            </template>
            Cancel
          </a-button>
          <a-button :isPrimary="true" type="submit">
            <template v-slot:icon-left>
              <a-check-icon />
            </template>
            Add Image
          </a-button>
        </template>
      </view-header>
      <div class="content">
        <app-loading v-if="isSaving" />
        <div v-if="!isSaving" class="content">
          <text-input v-model="name" label="Name" name="name"></text-input>
          <text-input
            v-model="description"
            label="Description"
            name="description"
          ></text-input>
          <text-input v-model="url" label="Url" name="url"></text-input>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AButton from '@/components/AButton';
import ACheckIcon from '@/components/icons/ACheckIcon';
import ACloseIcon from '@/components/icons/ACloseIcon';
import AppLoading from '@/components/AppLoading';
import TextInput from '@/components/TextInput';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'add-image-form',
  components: {
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
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
}
</style>
