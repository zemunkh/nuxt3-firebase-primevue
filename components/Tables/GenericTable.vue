<template>
  <div v-if="config.component.includes('datatable')">
    <Pagination
      :config="config"
    />
  </div>
  <div v-else-if="config.component.includes('dataview')">
    <h1>It is DataView</h1>
  </div>
  <div v-else-if="config.component.includes('treetable')">
    <h1>It is tree table</h1>
  </div>
</template>

<script setup>
import Pagination from "./DataTables/Pagination.vue";
// import Virtuals from "./DataTables/Virtuals.vue"

defineProps({
  config: { 
    type: Object,
  },
});
</script>
