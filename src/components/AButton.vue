<template>
  <router-link
    v-if="to"
    class="a-button"
    :class="{'is-primary': isPrimary}"
    :disabled="isDisabled"
    :to="to">
    <slot></slot>
  </router-link>
  <button
    class="a-button"
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
.a-button {
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--button__color);
  fill: var(--button__color);
  cursor: pointer;
  display: flex;
  font-family: var(--fontFamily-secondary);
  font-size: 1em;
  font-weight: 600;
  height: 36px;
  justify-content: center;
  line-height: 1.2em;
  outline: transparent solid 2px;
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
    color: var(--button__color--hover);
    fill: var(--button__color--hover);
  }

  &.is-primary {
    color: var(--button__color--primary);
    fill: var(--button__color--primary);

    &:hover {
      color: var(--button__color--primary-hover);
      fill: var(--button__color--primary-hover);
    }

    &:focus {
      box-shadow: 0 0 0 2px var(--button__outline-color--primary-focus);
    }
  }
}
</style>
