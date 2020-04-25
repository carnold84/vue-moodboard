<template>
  <a-modal :id="id" max-width="400px" :title="title" @dismiss="onDismiss">
    <template slot="content">
      <p class="text">{{ text }}</p>
    </template>
    <template slot="footer">
      <a-button @click="onDismiss">
        <template v-slot:icon-left>
          <a-close-icon />
        </template>
        <span>No</span>
      </a-button>
      <a-button :is-primary="true" @click="onConfirmClick">
        <template v-slot:icon-left>
          <a-check-icon />
        </template>
        <span>Yes</span>
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import AButton from 'aura-design-system/src/AButton';
import AModal from 'aura-design-system/src/AModal';
import ACheckIcon from 'aura-design-system/src/icons/ACheckIcon';
import ACloseIcon from 'aura-design-system/src/icons/ACloseIcon';

export default {
  name: 'confirm-dialog',
  components: {
    AButton,
    ACheckIcon,
    ACloseIcon,
    AModal,
  },
  methods: {
    onDismiss() {
      this.$emit('dismiss', this.id);
    },
    onConfirmClick() {
      this.$emit('confirm', this.id);
      this.onDismiss();
    },
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    text: {
      type: String,
    },
    title: {
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
