<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <page-header>
          <template v-slot:content-left>
            <h1 class="view-title">Projects</h1>
          </template>
          <template v-slot:content-right>
            <app-button :is-primary="true" to="/projects/create" type="router-link">New Project</app-button>
          </template>
        </page-header>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="project">
          <img height="200" width="100%" />
          <h3>Project 1</h3>
        </div>
      </div>
      <div class="col-3">
        <div class="project">
          <img height="200" width="100%" />
          <h3>Project 2</h3>
        </div>
      </div>
      <div class="col-3">
        <div class="project">
          <img height="200" width="100%" />
          <h3>Project 3</h3>
        </div>
      </div>
      <div class="col-3">
        <div class="project">
          <img height="200" width="100%" />
          <h3>Project 4</h3>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="project">
          <img height="200" width="100%" />
          <h3>Project 5</h3>
        </div>
      </div>
      <div class="col-3">
        <div class="project">
          <img height="200" width="100%" />
          <h3>Project 6</h3>
        </div>
      </div>
      <div class="col-3">
        <div class="project">
          <img height="200" width="100%" />
          <h3>Project 7</h3>
        </div>
      </div>
      <div class="col-3">
        <div class="project">
          <img height="200" width="100%" />
          <h3>Project 8</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "../components/AppButton";
import PageHeader from "../components/PageHeader";

export default {
  name: "projects",
  components: {
    AppButton,
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
