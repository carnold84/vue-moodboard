<template>
  <a-modal :id="id" max-width="540px" :title="title" @dismiss="onDismiss">
    <template v-slot:content>
      <a-loading v-if="isSaving" style="height: 250px; position: relative;" />
      <form v-if="!isSaving" class="form" ref="form" @submit.prevent="onSubmit">
        <a-text-field
          v-model="name"
          :errors="errors.name"
          label="Name*"
          name="name"
          style="margin: 0 0 15px"
        />
        <a-text-field
          v-model="description"
          label="Description"
          name="description"
          style="margin: 0 0 15px"
        />
        <a-text-field
          v-model="url"
          :errors="errors.url"
          label="Url*"
          name="url"
        />
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
        <span>{{ image ? "Update" : "Create" }}</span>
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
import ATextField from 'aura-design-system/src/ATextField';
import { TOAST_TYPES } from 'aura-design-system/src/AToast';

export default {
  name: 'add-image-modal',
  components: {
    AButton,
    ACheckIcon,
    ACloseIcon,
    ALoading,
    AModal,
    ATextField,
  },
  data() {
    return {
      description: this.image ? this.image.description : '',
      errors: {
        name: undefined,
        url: undefined,
      },
      isSaving: false,
      name: this.image ? this.image.name : '',
      url: this.image ? this.image.url : '',
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
      this.errors.name = undefined;
      this.errors.url = undefined;

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

      if (this.image) {
        data = {
          ...this.image,
          description: this.description,
          name: this.name,
        };
        text = `"${data.name}" was updated.`;
        title = 'Image Updated';
        response = await this.$store.dispatch('images/update', data);
      } else {
        data = {
          description: this.description,
          name: this.name,
          url: this.url,
        };
        text = `"${data.name}" was created.`;
        title = 'Image Created';

        if (this.project) {
          data.projectId = this.project.id;
        }

        response = await this.$store.dispatch('images/create', data);
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
    image: {
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
  padding: 25px;
  width: 100%;
}
</style>
