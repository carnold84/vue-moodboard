<template>
  <router-link class="button-wrapper" :class="{'is-primary': isPrimary}" :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'app-link',
  computed: {
    primaryClass: function() {
      return this.isPrimary ? 'is-primary' : null;
    },
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
      default: null,
      type: [String, Object,],
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
}

.button-wrapper {
  align-content: center;
  background-color: var(--button__bg-color);
  border: var(--button__border-color) solid 1px;
  border-radius: 3px;
  color: var(--button__color);
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  height: 36px;
  justify-content: center;
  outline: transparent solid 2px;
  padding: 0 15px;
  transition: all 150ms ease-in-out;
  width: 100%;

  &:disabled {
    pointer-events: none;
  }

  &:focus {
    background-color: var(--button__bg-color--focus);
    border-color: var(--button__border-color--focus);
    color: var(--button__color--focus);
    box-shadow: 0 0 0 2px var(--button__outline-color--focus);
  }

  &:hover {
    background-color: var(--button__bg-color--hover);
    border-color: var(--button__border-color--hover);
    color: var(--button__color--hover);
  }

  &.is-primary {
    background-color: var(--button__bg-color--primary);
    border-color: var(--button__border-color--primary);
    color: var(--button__color--primary);

    &:hover {
      background-color: var(--button__bg-color--primary-hover);
      border-color: var(--button__border-color--primary-hover);
      color: var(--button__color--primary-hover);
    }
  }
}
</style>
