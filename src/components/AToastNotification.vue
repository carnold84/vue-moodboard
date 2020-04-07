<template>
  <div class="a-toast-notification" :class="type">
    <a-error-icon v-if="type === TOAST_TYPES.ERROR" class="icon" />
    <a-info-icon v-if="type === TOAST_TYPES.INFO" class="icon" />
    <a-check-circle-icon v-if="type === TOAST_TYPES.SUCCESS" class="icon" />
    <div class="content">
      <h3 v-if="title" class="title">{{ title }}</h3>
      <p v-if="text" class="text">{{ text }}</p>
    </div>
    <a-button class="close-btn" @click="$emit('dismiss', id)">
      <a-close-icon />
    </a-button>
  </div>
</template>

<script>
import AButton from '@/components/AButton';
import ACheckCircleIcon from '@/components/icons/ACheckCircleIcon';
import ACloseIcon from '@/components/icons/ACloseIcon';
import AErrorIcon from '@/components/icons/AErrorIcon';
import AInfoIcon from '@/components/icons/AInfoIcon';

export const TOAST_TYPES = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
};

export default {
  name: 'a-toast-notification',
  components: {
    AButton,
    ACheckCircleIcon,
    ACloseIcon,
    AErrorIcon,
    AInfoIcon,
  },
  computed: {
    TOAST_TYPES() {
      return TOAST_TYPES;
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
    type: {
      default: TOAST_TYPES.ERROR,
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.a-toast-notification {
  align-items: center;
  background-color: var(--theme1);
  border: 1px solid var(--theme2);
  box-shadow: 0 10px 10px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  padding: 20px;
  width: 340px;

  &.error {
    fill: var(--error1);
  }

  &.info {
    fill: var(--primary1);
  }

  &.success {
    fill: var(--success1);
  }
}

.icon {
  margin: 0 15px 0 0;
}

.content {
  border-left: 1px solid var(--theme3);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 10px 0 15px;
}

.title {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0 0 5px;
}

.text {
  color: var(--text3);
  font-size: 1em;
  font-weight: 600;
}
</style>
