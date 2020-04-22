<template>
  <header class="view-header">
    <div class="main-content">
      <a-button
        v-if="onBack && isBackFunction"
        class="title-back-btn"
        @click="onBack"
      >
        <template v-slot:icon-left>
          <a-arrow-back-icon />
        </template>
        <span>Back</span>
      </a-button>
      <router-button
        v-if="onBack && !isBackFunction"
        :to="onBack"
        class="title-back-btn"
      >
        <template v-slot:icon-left>
          <a-arrow-back-icon />
        </template>
        <span>Back</span>
      </router-button>
      <div class="title">
        <h2 v-if="title" class="title-text">{{ title }}</h2>
      </div>
      <div class="description">
        <p v-if="description" class="description-text">{{ description }}</p>
      </div>
    </div>
    <div class="secondary-content">
      <slot name="controls" />
    </div>
  </header>
</template>

<script>
import { AButton } from 'aura-design-system';
import AArrowBackIcon from '@/components/icons/AArrowBackIcon';
import RouterButton from '@/components/RouterButton';

export default {
  name: 'view-header',
  components: {
    AArrowBackIcon,
    AButton,
    RouterButton,
  },
  computed: {
    isBackFunction() {
      return typeof this.onBack === 'function';
    },
  },
  props: {
    onBack: {
      type: [Function, Object, String],
    },
    description: {
      type: String,
    },
    sectionName: {
      type: String,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.view-header {
  align-content: center;
  background-color: var(--theme1);
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  margin: 0 0 10px;
  width: 100%;
}

.main-content {
  margin: 0 0 10px;
}

.meta {
  display: flex;
  height: 20px;
  margin: 0 0 3px;
}

.title {
  align-items: center;
  display: flex;
  margin: 0 0 10px;
}

.title-text {
  color: var(--text1);
  font-family: var(--secondary-font-family);
  font-size: 2.8em;
  font-weight: 400;
  line-height: 1em;
}

.title-back-btn {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  margin: 4px 5px 0 2px;
}

.description-text {
  color: var(--text2);
  font-family: var(--secondary-font-family);
  font-size: 1em;
  font-weight: 600;
  min-height: 20px;
}

.secondary-content {
  align-items: center;
  display: flex;

  & > * {
    margin: 0 0 0 10px;

    &:first-child {
      margin: 0;
    }
  }
}
</style>
