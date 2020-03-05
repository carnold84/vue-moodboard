<template>
  <a 
    v-if="type === 'routerLink'"
    class="wrapper"
    :class="{'is-primary': isPrimary}"
    :disabled="isDisabled"
    :to="to">
    <slot></slot>
  </a>
  <button
    class="wrapper"
    :class="{'is-primary': isPrimary}"
    :disabled="isDisabled"
    :type="type"
    v-else
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'app-button',
  methods: {
    onClick(evt) {
      if (this.$listeners.click) {
        this.$listeners.click(evt);
      }
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
      type: String,
    },
    type: {
      default: 'button',
      type: String,
      validator: value => {
        return value.match(/(button|routerLink|submit)/);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  align-content: center;
  background-color: transparent;
  border: var(--button__border-color) solid 1px;
  border-radius: 18px;
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
    border-color: var(--button__border-color--focus);
    color: var(--button__color--focus);
    box-shadow: 0 0 0 2px var(--button__outline-color--focus);
  }

  &:hover {
    border-color: var(--button__border-color--hover);
    color: var(--button__color--hover);
  }

  &.is-primary {
    border-color: var(--button__border-color--primary);
    color: var(--button__color--primary);

    &:hover {
      background-color: var(--button__bg-color--primary-hover);
      border-color: var(--button__border-color--primary-hover);
      color: var(--button__color--primary-hover);
    }

    &:focus {
      border-color: var(--button__border-color--focus);
      color: var(--button__color--focus);
      box-shadow: 0 0 0 2px var(--button__outline-color--primary-focus);
    }
  }
}
</style>
