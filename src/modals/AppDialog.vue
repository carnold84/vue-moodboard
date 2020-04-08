<template>
  <a-modal
    :is-active="isActive"
    :is-open="isOpen"
    max-width="400px"
    :name="name"
    :title="title"
    @close="onClose"
  >
    <template slot="content">
      <p class="text">{{ text }}</p>
    </template>
    <template slot="footer">
      <a-button @click="onClose">
        <template v-slot:icon-left>
          <a-close-icon />
        </template>
        No
      </a-button>
      <a-button v-if="onConfirm" :is-primary="true" @click="onConfirmClick">
        <template v-slot:icon-left>
          <a-check-icon />
        </template>
        Yes
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import AButton from '@/components/AButton';
import ACheckIcon from '@/components/icons/ACheckIcon';
import ACloseIcon from '@/components/icons/ACloseIcon';
import AModal from '@/components/AModal';

export const DIALOG_NAME = 'dialog';

export default {
  name: 'app-dialog',
  components: {
    AButton,
    ACheckIcon,
    ACloseIcon,
    AModal,
  },
  computed: {
    isActive() {
      return this.$store.getters['modals/active'] === this.name;
    },
    isOpen() {
      return this.$store.getters['modals/allOpen'].includes(this.name);
    },
  },
  data() {
    return {
      name: DIALOG_NAME,
    };
  },
  methods: {
    onClose() {
      this.$store.dispatch('modals/close', this.name);
    },
    onConfirmClick() {
      this.onConfirm();
      this.onClose();
    },
  },
  props: {
    onConfirm: {
      type: Function,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.text {
  color: var(--text1);
  font-size: 1em;
  font-weight: 600;
  line-height: 1.2em;
  padding: 22px;
}
</style>
