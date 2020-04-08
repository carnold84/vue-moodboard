<template>
  <a-modal :id="id" max-width="540px" :title="title" @dismiss="onDismiss">
    <template v-slot:content>
      <form
        v-if="isSaving === false"
        ref="form"
        class="form"
        @submit.prevent="onSubmit"
      >
        <text-input
          v-model="name"
          :errors="errors.name"
          label="Name"
          name="name"
          style="margin: 0 0 25px"
        />
        <text-input
          v-model="description"
          class="text-input"
          label="Description"
          name="description"
          style="margin: 0 0 15px"
        />
        <input type="submit" hidden="hidden" />
      </form>
    </template>
    <template v-slot:footer>
      <a-button @click="onDismiss">
        <template v-slot:icon-left>
          <a-close-icon />
        </template>
        Cancel
      </a-button>
      <a-button :isPrimary="true" @click.prevent="$refs.form.submit()">
        <template v-slot:icon-left>
          <a-check-icon />
        </template>
        Create
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import AButton from '@/components/AButton';
import ACheckIcon from '@/components/icons/ACheckIcon';
import ACloseIcon from '@/components/icons/ACloseIcon';
import AModal from '@/components/AModal';
import TextInput from '@/components/TextInput';
import { TOAST_TYPES } from '@/components/AToastNotification.vue';

export default {
  name: 'add-project-modal',
  components: {
    AButton,
    ACheckIcon,
    ACloseIcon,
    AModal,
    TextInput,
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
    async onSubmit() {
      if (this.name === '') {
        console.log('error');
        this.errors.name = 'Name is required.';
        return;
      }

      this.isSaving = true;

      const data = {
        description: this.description,
        name: this.name,
      };
      const response = await this.$store.dispatch('projects/create', data);

      if (response.success) {
        this.$store.dispatch('toasts/add', {
          text: `"${data.name}" was created.`,
          timeout: 3000,
          title: 'Project Created',
          type: TOAST_TYPES.SUCCESS,
        });
        this.onDismiss();
      } else {
        this.$store.dispatch('toasts/add', {
          text: `"${data.name}" couldn\'t be created.`,
          title: 'Error',
          type: TOAST_TYPES.ERROR,
        });
        console.error(response.message);
      }
    },
    onDismiss() {
      this.$emit('dismiss', this.id);
    },
  },
  props: {
    id: {
      required: true,
      type: String,
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
