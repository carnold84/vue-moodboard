<template>
  <router-link
    v-if="to"
    class="button-wrapper"
    :class="{'is-primary': isPrimary}"
    :disabled="isDisabled"
    :to="to">
    <slot></slot>
  </router-link>
  <button
    class="button-wrapper"
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
      type: [Object, String],
    },
    type: {
      default: 'button',
      type: String,
      validator: value => {
        return value.match(/(button|submit)/);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.button-wrapper {
  align-content: center;
  background-color: transparent;
  border: var(--button__border-color) solid 1px;
  border-radius: 18px;
  color: var(--button__color);
  cursor: pointer;
  display: grid;
  font-size: 1em;
  font-weight: 300;
  height: 36px;
  justify-content: center;
  line-height: 1.2em;
  min-width: 120px;
  outline: transparent solid 2px;
  padding: 0 15px;
  text-decoration: none;
  transition: all 150ms ease-in-out;
  width: 100%;

  &:disabled {
    pointer-events: none;
  }

  &:focus {
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

    &:focus {
      box-shadow: 0 0 0 2px var(--button__outline-color--primary-focus);
    }
  }
}
</style>
