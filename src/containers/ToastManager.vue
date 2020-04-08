<template>
  <div class="toast-manager">
    <transition-group name="slide">
      <a-toast-notification
        v-for="(toast, index) of toasts"
        :id="toast.id"
        :key="toast.id"
        :style="getStyles(index)"
        :text="toast.text"
        :title="toast.title"
        :type="toast.type"
        @dismiss="onDismiss"
        class="toast"
      />
    </transition-group>
  </div>
</template>

<script>
import AToastNotification from '@/components/AToastNotification';

export default {
  name: 'toast-manager',
  components: {
    AToastNotification,
  },
  computed: {
    toasts() {
      return this.$store.getters['toasts/list'];
    },
  },
  data() {
    return {
      activeToasts: {},
    };
  },
  methods: {
    dismiss(id) {
      const timeout = this.activeToasts[id];
      if (timeout) {
        clearTimeout(timeout);
      }

      this.$store.dispatch('toasts/remove', id);
      delete this.activeToasts[id];
    },
    getStyles(index) {
      const yPos = (this.toasts.length - index - 1) * 100;
      const margin = (this.toasts.length - index - 1) * 15;
      const duration = 300 + (this.toasts.length - index) * 100;

      return {
        transform: `translate3d(0, calc(-${yPos}% - ${margin}px), 0)`,
        transitionDuration: `${duration}ms`,
      };
    },
    onDismiss(id) {
      this.dismiss(id);
    },
  },
  watch: {
    toasts(newToasts, oldToasts) {
      for (const toast of newToasts) {
        // create timeout for any new toast
        if (toast.timeout && !this.activeToasts[toast.id]) {
          this.activeToasts[toast.id] = setTimeout(() => {
            this.dismiss(toast.id);
          }, toast.timeout);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.toast-manager {
  bottom: 30px;
  left: 30px;
  position: absolute;
  z-index: 10000;
}

.toast {
  bottom: 0;
  position: absolute;
  transition: opacity 500ms, transform 500ms;

  &:last-child {
    margin: 0;
  }

  &.slide-enter-active,
  &.slide-leave-active {
    opacity: 1;
  }

  &.slide-enter,
  &.slide-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0) !important;
  }
}
</style>
