<template>
  <div class="wrapper">
    <div class="loader" :style="{ width: diameter }">
      <svg
        class="circle"
        :style="{ height: diameter, width: diameter }"
        viewBox="25 25 50 50"
      >
        <circle
          class="path"
          cx="50"
          cy="50"
          r="15"
          fill="none"
          stroke-width="3"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-loading',
  props: {
    diameter: {
      type: String,
      default: '40px',
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

.wrapper {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
}

.loader {
  margin: 0 auto;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
}

.circle {
  animation: rotate 2s linear infinite;
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  stroke: #000000;
  top: 0;
  transform-origin: center center;
}

.path {
  animation: dash 1.5s ease-in-out infinite;
  stroke: var(--loading_bg-color);
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 3px;
}
</style>
