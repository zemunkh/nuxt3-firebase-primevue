<script setup>
import GenericTable from "~~/components/Tables/GenericTable.vue";
import productConfig from "~~/components/configs/product";

</script>

<template>
  <div class="container text-center">
    <h3 class="container">Admin product table 🎯</h3>
    <GenericTable :config="productConfig"/>
  </div>
</template>
