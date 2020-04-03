<template>
  <a-modal
    :is-active="isActive"
    :is-open="isOpen"
    :name="name"
    :title="title"
    @close="onClose"
  >
    <template slot="content">
      <p class="text">{{ text }}</p>
    </template>
    <template slot="footer">
      <div class="dialog-footer">
        <a-button @click="onClose">
          <a-close-icon />
          Wait, NO!
        </a-button>
        <a-button v-if="onConfirm" @click="onConfirmClick">
          <a-check-icon />
          Yes
        </a-button>
      </div>
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
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 18px 0 22px;
  width: 100%;

  & > * {
    margin: 0 0 0 20px;
  }
}
</style>
