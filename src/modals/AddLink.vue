<template>
  <a-modal :id="id" max-width="540px" :title="title" @dismiss="onDismiss">
    <template v-slot:content>
      <a-loading v-if="isSaving" style="height: 250px; position: relative;" />
      <form v-if="!isSaving" class="form" ref="form" @submit.prevent="onSubmit">
        <text-input v-model="name" label="Name" name="name" />
        <text-input
          v-model="description"
          label="Description"
          name="description"
        />
        <text-input v-model="url" label="Url" name="url" />
      </form>
    </template>
    <template v-slot:footer>
      <a-button :disabled="isSaving" @click="onDismiss">
        <template v-slot:icon-left>
          <a-close-icon />
        </template>
        <span>Cancel</span>
      </a-button>
      <a-button
        :disabled="isSaving"
        :isPrimary="true"
        @click.prevent="onClickSubmit"
      >
        <template v-slot:icon-left>
          <a-check-icon />
        </template>
        <span>{{ link ? "Update" : "Create" }}</span>
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import AButton from 'aura-design-system/src/AButton';
import ALoading from 'aura-design-system/src/ALoading';
import AModal from 'aura-design-system/src/AModal';
import ACheckIcon from 'aura-design-system/src/icons/ACheckIcon';
import ACloseIcon from 'aura-design-system/src/icons/ACloseIcon';
import { TOAST_TYPES } from 'aura-design-system/src/AToast';

import TextInput from '@/components/TextInput';

export default {
  name: 'add-link-modal',
  components: {
    AButton,
    ACheckIcon,
    ACloseIcon,
    ALoading,
    AModal,
    TextInput,
  },
  data() {
    return {
      description: this.link ? this.link.description : '',
      errors: {
        name: undefined,
        url: undefined,
      },
      isSaving: false,
      name: this.link ? this.link.name : '',
      url: this.link ? this.link.url : '',
    };
  },
  methods: {
    onClickSubmit() {
      const event = new Event('submit', {
        bubbles: true,
        cancelable: true,
      });

      this.$refs.form.dispatchEvent(event);
    },
    onDismiss() {
      this.$emit('dismiss', this.id);
    },
    async onSubmit() {
      if (this.name === '' || this.url === '') {
        if (this.name === '') {
          this.errors.name = 'Name is required.';
        }

        if (this.url === '') {
          this.errors.url = 'Url is required.';
        }
        return;
      }

      this.isSaving = true;

      let data;
      let response;
      let text;
      let timeout = 3000;
      let title;
      let type = TOAST_TYPES.SUCCESS;

      if (this.link) {
        data = {
          ...this.link,
          description: this.description,
          name: this.name,
        };
        text = `"${data.name}" was updated.`;
        title = 'Link Updated';
        response = await this.$store.dispatch('links/update', data);
      } else {
        data = {
          description: this.description,
          name: this.name,
          url: this.url,
        };
        text = `"${data.name}" was created.`;
        title = 'Link Created';

        if (this.project) {
          data.projectId = this.project.id;
        }

        response = await this.$store.dispatch('links/create', data);
      }

      if (response.success) {
        this.onDismiss();
      } else {
        text = `"${data.name}" couldn't be updated.`;
        title = 'Error';
        type = TOAST_TYPES.ERROR;
        console.error(response.message);
      }

      this.$store.dispatch('toasts/add', {
        text,
        timeout,
        title,
        type,
      });
    },
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    link: {
      type: Object,
    },
    project: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  padding: 25px 40px;
  width: 100%;
}
</style>
