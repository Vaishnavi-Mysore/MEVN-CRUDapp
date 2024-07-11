
<template>
  <div id="app" class="app">
    <Modules />
  </div>
</template>

<script>
import Modules from './views/ModuleView.vue';

export default {
  components: {
    Modules
  }
};
</script>

<style>
.app{
  margin: 2%;
}
</style>