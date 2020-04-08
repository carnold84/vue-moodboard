<template>
  <div class="modal-manager">
    {{ modals }}
    <div v-for="modal of modals" :key="modal.id">
      {{ modal }}
      <add-project-modal
        v-if="modal.type === MODAL_TYPES.ADD_PROJECT"
        :id="modal.id"
        :title="modal.title"
        @dismiss="dismiss"
      />
      <confirm-dialog
        v-if="modal.type === MODAL_TYPES.CONFIRM_DIALOG"
        v-bind="modal.props"
        @dismiss="dismiss"
      />
      <link-images-modal
        v-if="modal.type === MODAL_TYPES.LINK_IMAGES"
        v-bind="modal.props"
        @dismiss="dismiss"
      />
      <link-links-modal
        v-if="modal.type === MODAL_TYPES.LINK_LINKS"
        v-bind="modal.props"
        @dismiss="dismiss"
      />
    </div>
  </div>
</template>

<script>
import AddProjectModal from '@/modals/AddProject';
import ConfirmDialog from '@/modals/ConfirmDialog';
import LinkImagesModal from '@/modals/LinkImages';
import LinkLinksModal from '@/modals/LinkLinks';

export const MODAL_TYPES = {
  ADD_PROJECT: AddProjectModal.name,
  CONFIRM_DIALOG: ConfirmDialog.name,
  LINK_IMAGES: LinkImagesModal.name,
  LINK_LINKS: LinkLinksModal.name,
};

export default {
  name: 'modal-manager',
  components: {
    AddProjectModal,
    ConfirmDialog,
    LinkImagesModal,
    LinkLinksModal,
  },
  computed: {
    modals() {
      return this.$store.getters['modals/list'];
    },
  },
  data() {
    return {
      activeModals: {},
      MODAL_TYPES,
    };
  },
  methods: {
    dismiss(id) {
      this.$store.dispatch('modals/remove', id);
      delete this.activeModals[id];
    },
    onDismiss(id) {
      this.dismiss(id);
    },
  },
};
</script>

<style scoped lang="scss"></style>
