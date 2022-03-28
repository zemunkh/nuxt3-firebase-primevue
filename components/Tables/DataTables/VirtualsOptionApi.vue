<template>
  <div class="container mt-3">
    <div v-if="lazyLoading && products.length === 0">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <DataTable
        :value="products"
        scrollable
        scrollHeight="800px"
        :virtualScrollerOptions="{
          lazy: true,
          onLazyLoad: loadProductsLazy,
          itemSize: 100,
          delay: 200,
          showLoader: true,
          loading: lazyLoading,
          numToleratedItems: 50,
        }"
      >
        <Column field="name" :header="$t('table.header.name')" style="min-width: '200px'">
          <template #loading>
            <div
              class="flex align-items-center"
              :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
            >
              <Skeleton width="60%" height="1rem" />
            </div>
          </template>
        </Column>
        <Column :header="$t('table.header.image')" >
          <template #loading>
            <div
              class="flex align-items-center"
              :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
            >
              <Skeleton width="40%" height="1rem" />
            </div>
          </template>
          <template #body="slotProps">
            <img alt="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :src="slotProps.data ? slotProps.data.image : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'" class="product-image" />
          </template>
        </Column>
        <Column field="price" :header="$t('table.header.price')"  style="min-width: '200px'">
          <template #loading>
            <div
              class="flex align-items-center"
              :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
            >
              <Skeleton width="40%" height="1rem" />
            </div>
          </template>
          <template #body="slotProps">
            {{formatCurrency(slotProps.data ? slotProps.data.price : '1')}}
          </template>
        </Column>
        <Column field="seller" :header="$t('table.header.seller')"  style="min-width: '200px'">
          <template #loading>
            <div
              class="flex align-items-center"
              :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
            >
              <Skeleton width="40%" height="1rem" />
            </div>
          </template>
        </Column>
        <Column field="category" :header="$t('table.header.category')"  style="min-width: '200px'">
          <template #loading>
            <div
              class="flex align-items-center"
              :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
            >
              <Skeleton width="60%" height="1rem" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from '~/store/store'

export default {
  props: {
    collection: '',
    where: [], 
    doc: '',
    nick: '',
    actions: {
      _type: 'text',
      add: true,
      edit: true,
      delete: false,
      import: true,
      export: true,
      toggle: true,
    }
  },
  setup(props) {
    onMounted(async () => {
      lazyLoading.value = true
      let _products = await store.list('products', null)
      for (let index = 0; index < _products.length; index++) {
        products.value[index] =_products[index];
      }
      lastNumber.value = _products.length
      lazyLoading.value = false
    })

    const store = useStore();
    const products = ref(Array.from({ length: 1000 }));
    const lazyLoading = ref(false);
    const lastNumber = ref(0);

    const loadProductsLazy = async (event) => {
      !lazyLoading.value && (lazyLoading.value = true);
      let { first, last } = event;
      console.log('Lazy loading: ', last);
      // console.log('Last name: ', products.value[last - 1].name);

      let _virtualProducts = [...products.value];

      let loadedProducts = await store.list('products', last === 0 ? null : products.value[ lastNumber.value - 1]);
      // // populate page of virtual cars
      
      Array.prototype.splice.apply(_virtualProducts, [
        ...[lastNumber.value, loadedProducts.length  - lastNumber.value],
        ...loadedProducts,
      ]);

      // // _virtualProducts.concat(loadedProducts)

      // products.value = _virtualProducts;
      lazyLoading.value = false;
      lastNumber.value = lastNumber.value + (loadedProducts.length)
      console.log('Last loads counts: ', lastNumber.value);

    };

    const formatCurrency = (val) => {
      return val.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    };
    return { products, lazyLoading, loadProductsLazy, formatCurrency };
  },
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
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
</style> 