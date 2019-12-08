<template>
  <div class="wrapper" :class="primaryClass" :disabled="disabled" :type="type">
    <label class="label" :for="id">{{ label }}</label>
    <input
      @blur="onBlur && onBlur"
      class="input"
      @focus="onFocus && onFocus"
      :name="name"
      :id="id"
      :type="type"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
    <p class="errors">{{ errors }}</p>
  </div>
</template>

<script>
import _uniqueId from "lodash/uniqueId";

export default {
  name: "text-input",
  computed: {
    primaryClass: function() {
      return this.isPrimary ? "is-primary" : null;
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    errors: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: _uniqueId()
    },
    label: {
      type: String
    },
    name: {
      type: String
    },
    onBlur: {
      type: Function
    },
    onFocus: {
      type: Function
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.input {
  background-color: var(--textInput__input__bgColor);
  border: none;
  border-bottom: 2px solid var(--textInput__input__borderColor);
  color: var(--textInput__input__color);
  display: flex;
  font-size: 1em;
  padding: 35px 15px 10px;
  position: relative;

  &:focus {
    background-color: var(--textInput__input__bgColor--focus);
    border-color: var(--textInput__input__borderColor--focus);
    color: var(--textInput__input__borderColor--focus);
    outline: none;
  }
}

.label {
  color: var(--textInput__label__color);
  font-weight: 700;
  left: 15px;
  position: absolute;
  top: 10px;
  z-index: 1;
}

.errors {
  color: var(--textInput__errors__color);
  height: 15px;
  margin: 8px 0 20px;
}
</style>
