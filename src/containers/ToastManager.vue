<template>
  <div class="toast-manager">
    <a-toast-notification
      v-for="toast of toasts"
      :id="toast.id"
      :key="toast.id"
      :text="toast.text"
      :title="toast.title"
      @dismiss="onDismiss"
      class="toast"
    />
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
  methods: {
    dismiss(id) {
      this.$store.dispatch('toasts/remove', id);
    },
    onDismiss(id) {
      this.dismiss(id);
    },
  },
  watch: {
    toasts(oldToasts, newToasts) {
      console.log(oldToasts, newToasts);
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
  margin: 0 0 15px;
  transition: all 300ms ease;

  &:last-child {
    margin: 0;
  }
}
</style>
