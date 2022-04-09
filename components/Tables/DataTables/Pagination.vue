<template>
  <div class="container" style="color: white">
    <Loader :isLoading="isLoading"/>
    <div v-if="pending">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <DataTable
        :value="store.products"
        :paginator="true"
        :rows="10"
        :loading="loading"
        :totalRecords="totalCounts"
        :rowsPerPageOptions="[10, 15, 25]"
        responsiveLayout="scroll"
        @page="onPage($event)"
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

        <!-- <Column v-if="fields.programs._table" field="programs" :header="$t('table.header.programs')">
          <template #body="slotProps">
            <MultiSelect
              v-model="slotProps.data.program"
              :options="programOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select program"
              @change="onChangeProgram($event)"
              :binary="true" />
          </template>
        </Column> -->

        <!-- <Column v-if="fields.category._table" field="category" :header="$t('table.header.category')">
          <template #body="slotProps">
            <Dropdown
              v-model="slotProps.data.category"
              :options="categoryOptions"
              optionLabel="name"
              placeholder="Select category"
              @change="onChangeCategory($event)"
             />
          </template>
        </Column>        -->
      
        <template #footer>
          In total there are {{ items ? items.length : 0 }} items.
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from "~/store/store";
  import Loader from "~~/components/Tools/Loader.vue";
  // import {FilterMatchMode,FilterOperator} from 'primevue/api';

  const props = defineProps({
    config: { 
      type: Object,
    },
  });

  const store = useStore();
  const isLoading = ref(false);
  const loading = ref(false);
  const totalCounts = ref(100);
  // const { listen } = useFirestore()

  // const programOptions = ref([])
  // const filters =  ref ({
  //   'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  // })

  // useLazyAsyncData as onMounted() property of Vue 3
  const { pending, data: items } = useLazyAsyncData(`${props.config.collection}`, () =>
    store.list(props.config.collection, props.config.where, null, props.config.nick, 50)
  );

  // items.value = listen(props.config.collection, props.config.where)

  // const { pendingProgramOptions, data: programOptions } = useLazyAsyncData('programs', () =>
  //   store.list(props.config.fields.programs._options.collection, props.config.fields.programs._options.where, null, props.config.nick)
  // );

  // const { pendingCategoryOptions, data: categoryOptions } = useLazyAsyncData('categories', () =>
  //   store.list(props.config.fields.category._options.collection, props.config.fields.category._options.where, null, props.config.nick)
  // );

  const formatCurrency = (val) => {
    if(val) return val.toLocaleString("en-US", { style: "currency", currency: "USD" });
  };
  const formatDate = (val) => {
    return `${val.substring(0, 10)} ${val.substring(11, 16)}`;
  };
  const onToggle = async (id, _fieldName, value) => {
    isLoading.value = true
    console.log('Clicked 💾: ' + id + ' Val: ' + value);
    await store.update(props.config.collection, id, { [_fieldName]: !value})
    isLoading.value = false
  }
  const onChangeProgram = async (event) => {
    console.log('Program 🚨 ', event.value);
  }
  const onChangeCategory = async (event) => {
    console.log('Category 🚨 ', event.value.name);
  }
  const onPage = async (event) => {
    const { first } = event;
    loading.value = true;
    console.log("Event first: ", first);
    console.log("Last ⛴ ", items.value[items.value.length - 1].id);
    if (first > items.value.length - 26) {
      let loadedItems = await store.list(
        `${props.config.collection}`,
        props.config.where,
        items.value[items.value.length - 1],
        props.config.nick,
        50
      );
      for (let index = 0; index < loadedItems.length; index++) {
        items.value.push(loadedItems[index]);
      }
      totalCounts.value = items.value.length;
    } else {
      console.log("✅");
    }
    loading.value = false;
  };
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
