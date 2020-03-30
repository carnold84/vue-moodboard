<template>
  <header class="view-header">
    <div class="main-content">
      <a-button
        v-if="onBack && isBackFunction"
        class="title-back-btn"
        @click="onBack"
      >
        <a-back-arrow></a-back-arrow>
        <span>Back</span>
      </a-button>
      <a-button
        v-if="onBack && !isBackFunction"
        :to="onBack"
        class="title-back-btn"
      >
        <a-back-arrow></a-back-arrow>
        <span>Back</span>
      </a-button>
      <div class="title">
        <h2 v-if="title" class="title-text">{{ title }}</h2>
      </div>
      <div class="description">
        <p v-if="description" class="description-text">{{ description }}</p>
      </div>
    </div>
    <div class="secondary-content">
      <a-select v-if="options" alignMenu="right" :items="options"></a-select>
    </div>
  </header>
</template>

<script>
import ABackArrow from '@/components/icons/ABackArrow';
import AButton from '@/components/AButton';
import ASelect from '@/components/ASelect';

export default {
  name: 'view-header',
  components: {
    ABackArrow,
    AButton,
    ASelect,
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
    options: {
      type: Array,
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
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  margin: 0 0 20px;
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
  min-height: 50px;
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
}
</style>
