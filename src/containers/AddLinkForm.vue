<template>
  <div class="add-link-form content">
    <form class="content" @submit.prevent="create">
      <view-header :description="subTitle" :on-back="backUrl" :title="title">
        <template v-slot:controls>
          <router-button :to="backUrl">
            <template v-slot:icon-left>
              <a-close-icon />
            </template>
            Cancel
          </router-button>
          <a-button :isPrimary="true" type="submit">
            <template v-slot:icon-left>
              <a-check-icon />
            </template>
            Add Link
          </a-button>
        </template>
      </view-header>
      <div class="content">
        <a-loading v-if="isSaving" />
        <div v-if="!isSaving" class="content">
          <a-text-field v-model="name" label="Name" name="name" />
          <a-text-field
            v-model="description"
            label="Description"
            name="description"
          />
          <a-text-field v-model="url" label="Url" name="url" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AButton from 'aura-design-system/src/AButton';
import ALoading from 'aura-design-system/src/ALoading';
import ACheckIcon from 'aura-design-system/src/icons/ACheckIcon';
import ACloseIcon from 'aura-design-system/src/icons/ACloseIcon';
import ATextField from 'aura-design-system/src/ATextField';
import { TOAST_TYPES } from 'aura-design-system/src/AToast';

import RouterButton from '@/components/RouterButton';
import ViewHeader from '@/components/ViewHeader';

export default {
  name: 'add-link-form',
  components: {
    AButton,
    ACheckIcon,
    ACloseIcon,
    ALoading,
    RouterButton,
    ATextField,
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

      const data = {
        description: this.description,
        name: this.name,
        url: this.url,
      };

      if (this.project) {
        data.projectId = this.project.id;
      }

      const response = await this.$store.dispatch('links/create', data);

      if (response.success) {
        this.$store.dispatch('toasts/add', {
          text: `"${data.name}" was created.`,
          timeout: 3000,
          title: 'Link Created',
          type: TOAST_TYPES.SUCCESS,
        });
        this.$router.push(this.backUrl);
      } else {
        this.$store.dispatch('toasts/add', {
          text: `"${data.name}" couldn\'t be created.`,
          title: 'Error',
          type: TOAST_TYPES.ERROR,
        });
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
