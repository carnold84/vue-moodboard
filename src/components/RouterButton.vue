<template>
  <router-link :to="to" style="text-decoration: none;">
    <a-button v-bind="$props">
      <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
    </a-button>
  </router-link>
</template>

<script>
import { AButton } from 'aura-design-system';

export default {
  name: 'router-button',
  components: {
    AButton,
  },
  props: {
    isDisabled: {
      default: false,
      type: Boolean,
    },
    isPrimary: {
      default: false,
      type: Boolean,
    },
    to: {
      type: [Object, String],
    },
  },
};
</script>
