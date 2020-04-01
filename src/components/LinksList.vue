<template>
  <div class="a-table" :class="breakpoints">
    <resizable @resize="onResize" />
    <div
      v-for="item of links"
      :key="item.id"
      :style="
        isRow
          ? {
              gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)`
            }
          : {
              gridTemplateRows: `repeat(${columns.length + 1}, 1fr)`
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
      <div class="cell controls">
        <a-button @click="$emit('delete', item.id)">
          <a-block-icon height="18" width="18"></a-block-icon>
          Delete
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import ABlockIcon from '@/components/icons/ABlockIcon';
import AButton from '@/components/AButton';
import Resizable from '@/components/Resizable';

export default {
  name: 'links-list',
  components: {
    ABlockIcon,
    AButton,
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
    links: {
      default() {
        return [];
      },
      type: Array,
    },
    onDelete: {
      type: Function,
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
  display: grid;
  margin: 0 0 10px;
  padding: 5px 0;

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
