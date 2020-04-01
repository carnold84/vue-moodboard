<template>
  <div class="a-table" :class="breakpoints">
    <resizable @resize="onResize" />
    <div
      v-for="item of items"
      :key="item.id"
      :style="
        isRow
          ? {
              gridTemplateColumns: `repeat(${columns.length}, 1fr)`
            }
          : {
              gridTemplateRows: `repeat(${columns.length}, 1fr)`
            }
      "
      class="row"
    >
      <div
        v-for="column of columns"
        :key="column.key"
        class="cell"
        :class="{
          'has-emphasis': column.hasEmphasis === true,
          wrap: column.shouldWrap === undefined ? true : column.shouldWrap
        }"
        :style="{
          minWidth: column.width
        }"
      >
        <a
          v-if="column.isLink"
          :href="item[column.key]"
          class="link"
          rel="noreferrer"
          target="_blank"
        >
          {{ item[column.key] }}
        </a>
        <span v-else class="text">
          {{ item[column.key] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Resizable from '@/components/Resizable';

export default {
  name: 'a-table',
  components: {
    Resizable,
  },
  data() {
    return {
      breakpoints: [],
      isRow: false,
    };
  },
  methods: {
    onResize({ width }) {
      let classes = [];

      this.isRow = width > 670;

      if (this.isRow) {
        classes.push('md');
      }

      this.breakpoints = classes;
    },
  },
  props: {
    columns: {
      type: Array,
    },
    items: {
      default() {
        return [];
      },
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
.a-table {
  display: grid;
}

.row {
  border-bottom: 1px solid var(--theme3);
  row-gap: 10px;
  display: grid;
  padding: 20px;

  .md & {
    column-gap: 30px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 30px;
  }
}

.cell {
  align-items: center;
  display: flex;
  height: 100%;
  overflow: hidden;
}

.text {
  color: var(--text1);
  font-size: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .has-emphasis & {
    color: var(--primary1);
    font-size: 1.1em;
    font-weight: 600;
  }

  .wrap & {
    text-overflow: unset;
    white-space: normal;
  }
}

.link {
  color: var(--text1);
  overflow: hidden;
  padding: 0 0 2px;
  text-decoration-style: dotted;
  text-underline-position: under;
  text-overflow: ellipsis;
  white-space: nowrap;

  .has-emphasis & {
    font-weight: 600;
  }

  .wrap & {
    text-overflow: unset;
    white-space: normal;
  }

  &:hover {
    color: var(--primary1);
  }
}
</style>
