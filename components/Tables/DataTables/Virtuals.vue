<template>
  <div class="container mt-3">
    <Loader :isLoading="isLoading"/>
    <div v-if="pending">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <DataTable
        :value="items"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="table-header">
            {{ config.doc.toUpperCase() }}
            <Button icon="pi pi-refresh" />
          </div>
        </template>

        <div v-for="(item, key) in config.fields">
          <div v-if="item._table">
            <div v-if="item._type === 'text'">
              <Column :field="key" :header="key" style="min-width:12rem"></Column>
            </div>
            <div v-else-if="item._type === 'number'">
              <div v-if="key.includes('price')">
                <Column :field="key" :header="key">
                  <template #body="slotProps">
                    {{ formatCurrency(slotProps.data ? slotProps.data[key] : "1") }}
                  </template>
                </Column>
              </div>
              <div v-else>
                <Column :field="key" :header="key" style="min-width:12rem"></Column>
              </div>
            </div>
            <div v-else-if="item._type === 'switch'">
              <Column :field="key" :header="key">
                <template #body="slotProps">
                  <Checkbox v-model="slotProps.data[key]"  @click="onToggle(slotProps.data.id, key, slotProps.data[key])" :binary="true" />
                </template>
              </Column>
            </div>
            <div v-else-if="item._type === 'select'">
              <Column :field="key" :header="key" style="min-width:12rem"></Column>
            </div>
            <div v-else-if="item._type === 'multiselect'">
              <Column :field="key" :header="key" style="min-width:12rem"></Column>
            </div>
            <div v-else-if="item._type === 'image'">
              <Column :header="key">
                <template #body="slotProps">
                  <img
                    alt="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                    :src="slotProps.data.image"
                    class="product-image"
                  />
                </template>
              </Column>
            </div>
            <div v-else>
              <b>Not available</b>
            </div>
          </div>
        </div>

      </DataTable>

      <AppInfiniteScroll
        @load="loadMoreItems()"
        :done="items.length === totalCounts"
      />
    </div>
  </div>
</template>

<script setup>
  import { useStore } from "~/store/store";
  import AppInfiniteScroll from "../AppInfiniteScroll.vue";
  import Loader from "~~/components/Tools/Loader.vue";

  const props = defineProps({
    config: { 
      type: Object,
    },
  });

  const store = useStore();
  const isLoading = ref(false);
  const totalCounts = ref(0);
  // const programOptions = ref([])

  // useLazyAsyncData as onMounted() property of Vue 3
  const { pending, data: items } = useLazyAsyncData(`${props.config.collection}`, () =>
    store.list(props.config.collection, props.config.where, null, props.config.nick, 25)
  );

  const loadMoreItems = async () => {
    isLoading.value = true
    totalCounts.value = items.value.length
    console.log('Load more... 🥶');
    const _itemsLoaded = await store.list(props.config.collection, props.config.where, lastFetchedItem(), props.config.nick, 10)

    for (let index = 0; index < _itemsLoaded.length; index++) {
      items.value.push(_itemsLoaded[index]);
    }
    totalCounts.value += _itemsLoaded.length
    isLoading.value = false
    console.log('Total 🚨: ', totalCounts.value);
  }
 
  const lastFetchedItem = () => {
    if (items.value === null) return null
    if ( items.length === 0 ) return null
    return items.value[items.value.length - 1]
  }

  const formatCurrency = (val) => {
    if(val) return val.toLocaleString("en-US", { style: "currency", currency: "USD" });

  };
  const formatDate = (val) => {
    return `${val.substring(0, 10)} ${val.substring(11, 16)}`;
  };
  const onToggle = async (id, _fieldName, value) => {
    isLoading.value = true
    console.log('Clicked 💾: ' + id + ' Val: ' + !value);
    await store.update(props.config.collection, id, { _fieldName: !value})
    isLoading.value = false
  }
  // const onChangeProgram = async (event) => {
  //   console.log('Program 🚨 ', event.value);
  // }
  // const onChangeCategory = async (event) => {
  //   console.log('Category 🚨 ', event.value.name);
  // }
</script>



<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
</style> 