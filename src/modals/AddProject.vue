<template>
  <a-modal :id="id" max-width="540px" :title="title" @dismiss="onDismiss">
    <template v-slot:content>
      <a-loading v-if="isSaving" style="height: 250px; position: relative;" />
      <form v-if="!isSaving" class="form" ref="form" @submit.prevent="onSubmit">
        <a-text-field
          v-model="name"
          :errors="errors.name"
          label="Name"
          name="name"
          style="margin: 0 0 15px"
        />
        <a-text-field
          v-model="description"
          label="Description"
          name="description"
          style="margin: 0 0 15px"
        />
        <input type="submit" hidden="hidden" />
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
        <span>{{ project ? "Update" : "Create" }}</span>
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
  name: 'add-project-modal',
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
      description: this.project ? this.project.description : '',
      errors: {
        name: undefined,
      },
      isSaving: false,
      name: this.project ? this.project.name : '',
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

      if (this.name === '') {
        this.errors.name = 'Name is required.';
        return;
      }

      this.isSaving = true;

      let data;
      let response;
      let text;
      let timeout = 3000;
      let title;
      let type = TOAST_TYPES.SUCCESS;

      if (this.project) {
        data = {
          ...this.project,
          description: this.description,
          name: this.name,
        };
        text = `"${data.name}" was updated.`;
        title = 'Project Updated';
        response = await this.$store.dispatch('projects/update', data);
      } else {
        data = {
          description: this.description,
          name: this.name,
        };
        text = `"${data.name}" was created.`;
        title = 'Project Created';
        response = await this.$store.dispatch('projects/create', data);
      }

      if (response.success) {
        this.onDismiss();
      } else {
        text = `"${data.name}" couldn't be updated.`;
        title = 'Error';
        type = TOAST_TYPES.ERROR;
        console.error(response.message);
      }

      this.isSaving = false;

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
