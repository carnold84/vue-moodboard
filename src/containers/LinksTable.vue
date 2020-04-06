<template>
  <div class="links-table">
    <app-loading v-if="isLoading" />
    <div v-if="!isLoading" class="list" :class="breakpoints">
      <resizable @resize="onResize" />
      <div v-for="item of links" :key="item.id" class="row">
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
          <a-button
            v-if="!project"
            class="control"
            :title="`Add/Remove ${item.name} from/to Projects`"
            @click="onLinkToProject(item)"
          >
            <a-list-icon />
          </a-button>
          <div v-if="project" class="control-loading">
            <app-loading v-if="areLinking[item.id]" diameter="20" />
            <a-button
              v-if="!areLinking[item.id]"
              class="control"
              :title="`Remove ${item.name} from ${project.name}`"
              @click="onUnlinkFromProject(item)"
            >
              <a-remove-icon />
            </a-button>
          </div>
          <a-button
            class="control"
            :title="`Delete ${item.name}`"
            @click="onDelete(item.id)"
          >
            <a-block-icon height="16" width="16" />
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ABlockIcon from '@/components/icons/ABlockIcon';
import AButton from '@/components/AButton';
import AListIcon from '@/components/icons/AListIcon';
import AppLoading from '@/components/AppLoading';
import ARemoveIcon from '@/components/icons/ARemoveIcon';
import { LINK_LINKS_MODAL } from '../modals/LinkLinks.vue';
import Resizable from '@/components/Resizable';

export default {
  name: 'links-table',
  components: {
    ABlockIcon,
    AButton,
    AListIcon,
    AppLoading,
    ARemoveIcon,
    Resizable,
  },
  computed: {
    projects() {
      return this.$store.getters['projects/list'];
    },
  },
  data() {
    return {
      areLinking: {},
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
    async onUnlinkFromProject(link) {
      Vue.set(this.areLinking, link.id, link.id);

      const response = await this.$store.dispatch('links/unlink', {
        link,
        project: this.project,
      });

      Vue.delete(this.areLinking, link.id);
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
.links-table {
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
  row-gap: 10px;

  .md & {
    column-gap: 10px;
    grid-template-columns: 18% 18% auto 60px;
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
  margin: 0 10px 0 0;
  padding: 0;

  .md & {
    margin: 0 0 0 10px;
  }
}

.control-loading {
  height: 36px;
  position: relative;
  width: 36px;
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
