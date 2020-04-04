<template>
  <div class="links-list">
    <app-loading v-if="isLoading" />
    <div v-if="!isLoading" class="list" :class="breakpoints">
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
          <a-button class="control" @click="onLinkToProject(item)">
            <a-add-icon />
          </a-button>
          <a-button class="control" @click="onDelete(item.id)">
            <a-block-icon height="16" width="16" />
            Delete
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AAddIcon from '@/components/icons/AAddIcon';
import ABlockIcon from '@/components/icons/ABlockIcon';
import AButton from '@/components/AButton';
import AppLoading from '@/components/AppLoading';
import { LINK_LINKS_MODAL } from '../modals/LinkLinks.vue';
import Resizable from '@/components/Resizable';

export default {
  name: 'links-list',
  components: {
    AAddIcon,
    ABlockIcon,
    AButton,
    AppLoading,
    Resizable,
  },
  computed: {
    projects() {
      return this.$store.getters['projects/list'];
    },
  },
  data() {
    return {
      breakpoints: [],
      isLoading: false,
      isRow: false,
      columns: [
        {
          hasEmphasis: true,
          key: 'name',
          label: 'Name',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'url',
          label: 'Link',
          isLink: true,
          shouldWrap: false,
        },
      ],
    };
  },
  methods: {
    async onDelete(id) {
      this.isLoading = true;

      const link = this.links.filter(element => {
        return element.id === id;
      })[0];

      if (this.project) {
        link.projectId = this.project.id;
      }

      const response = await this.$store.dispatch('links/delete', link);

      if (response.success) {
        this.isLoading = false;
      } else {
        console.error(response.message);
      }
    },
    onLinkToProject(link) {
      this.$store.dispatch('modals/open', {
        name: LINK_LINKS_MODAL,
        props: {
          link,
          title: `Add ${link.name} to a project`,
        },
      });
    },
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
    links: {
      default() {
        return [];
      },
      type: Array,
    },
    project: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.links-list {
  display: grid;
}

.list {
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

.controls {
  overflow: visible;
}

.control {
  margin: 0 0 0 10px;
  padding: 0;
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
