<template>
  <header class="a-view-header">
    <div class="meta-content">
      <a-tag v-if="sectionName" :text="sectionName"></a-tag>
    </div>
    <div class="main-content">
      <h2 v-if="title" class="title">{{title}}</h2>
      <a-select v-if="options" alignMenu="right" :items="options"></a-select>
    </div>
    <div class="secondary-content">
      <p v-if="description" class="description">{{description}}</p>
    </div>
  </header>
</template>

<script>
import ASelect from '@/components/ASelect';
import ATag from '@/components/ATag';
import ButtonGroup from '@/components/ButtonGroup';

export default {
  name: 'page-header',
  components: {
    ASelect,
    ATag,
  },
  props: {
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
.a-view-header {
  align-content: center;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
  margin: 0 0 20px;
  width: 100%;
}

.main-content {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.meta-content {
  display: flex;
}

.sectionName {
  margin: 0 0 5px;
}

.title {
  color: var(--text1);
  font-family: var(--secondary-font-family);
  font-size: 3.3em;
  font-weight: 400;
  line-height: 1em;
  margin: 0 0 7px;
}

.description {
  color: var(--text2);
  font-family: var(--secondary-font-family);
  font-size: 1em;
  font-weight: 600;
}
</style>
