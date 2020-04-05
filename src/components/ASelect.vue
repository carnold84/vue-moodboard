<template>
  <div
    class="a-select"
    :class="{
      'is-active': isActive,
      'is-left': alignMenu === 'left',
      'is-right': alignMenu === 'right'
    }"
    v-click-outside="onClickOutside"
  >
    <a-button
      aria-haspopup="true"
      aria-controls="select-menu"
      class="trigger-btn"
      @click="onTriggerClick"
    >
      <a-more-icon></a-more-icon>
      <span class="trigger-btn-title">{{ title }}</span>
    </a-button>
    <div v-if="isActive" class="select-menu" id="select-menu" role="menu">
      <button
        v-for="item in items"
        :key="item.id"
        class="select-item"
        :title="item.label"
        @click="item.callback(item.id)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/AButton';
import AMoreIcon from '@/components/icons/AMoreIcon';
import vClickOutside from 'v-click-outside';

export default {
  name: 'a-select',
  components: {
    AButton,
    AMoreIcon,
  },
  data() {
    return {
      isActive: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    onTriggerClick() {
      this.isActive = !this.isActive;
    },
    onClickOutside() {
      this.isActive = false;
    },
  },
  props: {
    alignMenu: {
      default: 'left',
      type: String,
      validator: value => {
        return value.match(/(left|right)/);
      },
    },
    isDisabled: {
      default: false,
      type: Boolean,
    },
    items: {
      type: Array,
    },
    showIcon: {
      default: true,
      type: Boolean,
    },
    title: {
      default: 'Options',
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.a-select {
  position: relative;
}

.trigger-btn {
  align-items: center;
  align-self: center;
  background-color: transparent;
  border: none;
  color: var(--text1);
  cursor: pointer;
  display: flex;
  fill: var(--text1);
  font-family: var(--fontFamily--primary);
  font-size: 1em;
  font-weight: 600;
  height: 36px;

  &:hover {
    color: var(--primary1);
    fill: var(--primary1);
  }
}

.trigger-btn-title {
  font-weight: 600;
  margin: 0 0 2px 3px;
}

.select-menu {
  background-color: var(--theme1);
  border: 1px solid var(--theme4);
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-width: 100px;
  max-width: 240px;
  position: absolute;
  z-index: 10;

  .is-left & {
    left: 0;
  }

  .is-right & {
    right: 0;
  }
}

.select-item {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--theme4);
  color: var(--text1);
  cursor: pointer;
  font-family: var(--fontFamily--primary);
  font-size: 1em;
  font-weight: 600;
  overflow: hidden;
  padding: 15px 17px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: var(--primary1);
  }

  &:last-child {
    border-bottom: none;
  }
}
</style>
