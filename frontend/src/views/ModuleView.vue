<template>
  <div >
    <ModuleGrid />
  </div>
</template>

<script>
import ModuleGrid from '@/components/ModuleGrid.vue';

export default {
  components: {
    ModuleGrid,
  },
  data() {
    return {
      showForm: false,
      selectedModule: null,
      isNewModule: true,
    };
  },
  methods: {
    handleModuleSaved() {
      this.showForm = false;
      this.selectedModule = null;
      this.isNewModule = true;
    },
  },
};
</script>

