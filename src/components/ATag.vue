<template>
  <div class="a-tag-wrapper">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'a-tag',
  props: {
    text: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.a-tag-wrapper {
  align-self: flex-start;
  background-color: transparent;
  border: var(--theme3) solid 1px;
  color: var(--text2);
  display: flex;
  font-size: 0.85em;
  font-weight: 600;
  line-height: 1.2em;
  padding: 3px 6px;
  text-transform: uppercase;
}
</style>
