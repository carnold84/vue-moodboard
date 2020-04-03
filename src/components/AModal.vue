<template>
  <div v-if="isOpen" class="a-modal">
    <div class="modal">
      <header class="modal-header">
        <h2 class="modal-title">{{ title }}</h2>
        <a-button @click="onClose">
          <a-close-icon />
        </a-button>
      </header>
      <div class="modal-content">
        <slot name="content"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <div
      class="modal-overlay"
      :class="{ 'is-active': isActive }"
      @click="onClose"
    />
  </div>
</template>

<script>
import AButton from '@/components/AButton';
import ACloseIcon from '@/components/icons/ACloseIcon';

export default {
  name: 'a-modal',
  beforeDestroy() {
    if (this.isOpen) {
      this.onClose();
    }
  },
  components: {
    AButton,
    ACloseIcon,
  },
  methods: {
    onClose(evt) {
      this.$emit('close', evt);
    },
  },
  props: {
    isActive: {
      default: false,
      type: Boolean,
    },
    isOpen: {
      default: false,
      type: Boolean,
    },
    name: {
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
.a-modal {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10000;
}

.modal {
  background-color: var(--theme1);
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  margin: 0 30px;
  max-width: 600px;
  width: 100%;
  z-index: 1;
}

.modal-header {
  align-items: center;
  background-color: var(--theme1);
  border-bottom: 1px solid var(--theme3);
  display: flex;
  flex-shrink: 0;
  height: 60px;
  justify-content: space-between;
  padding: 0 8px 0 22px;
}

.modal-title {
  color: var(--text1);
  font-size: 1.2em;
  font-weight: 600;
}

.modal-content {
  flex-grow: 1;
  padding: 20px 22px;
}

.modal-footer {
  align-items: center;
  background-color: var(--theme1);
  border-top: 1px solid var(--theme3);
  display: flex;
  flex-shrink: 0;
  height: 60px;
}

.modal-overlay {
  background-color: #000000;
  height: 100%;
  left: 0;
  opacity: 0.15;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
}
</style>
