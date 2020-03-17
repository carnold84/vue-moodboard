<template>
  <div class="wrapper">
    <div v-for="(item, index) in items" :key="item.id">
      <router-link v-if="item.to" :to="item.to">{{item.title}}</router-link>
      <span v-if="index < items.length - 1" class="divider">/</span>
      <p v-if="!item.to" class="title">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb-nav',
  props: {
    items: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 10px;
}

a {
  align-items: flex-start;
  color: var(--primary1);
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
  text-decoration: none;

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
    color: var(--primary2);
    text-decoration: underline;
  }
}

.divider {
  align-items: flex-start;
  font-size: inherit;
  font-weight: inherit;
  margin: 0 8px;
}

.title {
  align-items: flex-start;
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}
</style>
