<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <page-header>
          <template v-slot:content-left>
            <h1 class="view-title"> Create Project</h1>
          </template>
        </page-header>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";

export default {
  name: "project-edit",
  components: {
    PageHeader
  }
};
</script>

<style lang="scss">
.project {
  margin: 0 0 20px;

  h3 {
    font-weight: 300;
  }

  img {
    background-color: aquamarine;
    height: 200px;
    width: 100%;
  }
}
</style>
