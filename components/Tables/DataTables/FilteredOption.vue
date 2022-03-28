<template>
  <div class="container">
    <h5>Filter Row</h5>
    <p>Filters are displayed inline within a separate row.</p>
    <DataTable
      :value="customers2"
      :paginator="true"
      class="p-datatable-customers"
      :rows="10"
      dataKey="id"
      v-model:filters="filters2"
      filterDisplay="row"
      :loading="loading2"
      responsiveLayout="scroll"
      :globalFilterFields="[
        'name',
        'country.name',
        'representative.name',
        'status',
      ]"
    >
      <template #header>
        <div class="flex justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters2['global'].value"
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <!-- <Column field="name" header="Name" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
            :placeholder="`Search by name - `"
            v-tooltip.top.focus="'Hit enter key to filter'"
          />
        </template>
      </Column> -->
      <!-- <Column
        header="Country"
        filterField="country.name"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          <img
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            width="30"
          />
          <span class="image-text">{{ data.country.name }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by country"
            v-tooltip.top.focus="'Filter as you type'"
          />
        </template>
      </Column> -->
      <Column
        header="Agent"
        filterField="representative"
        :showFilterMenu="false"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          <img
            :alt="data.representative.name"
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            width="32"
            style="vertical-align: middle"
          />
          <span class="image-text">{{ data.representative.name }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="representatives"
            optionLabel="name"
            placeholder="Any"
            class="p-column-filter"
          >
            <template #option="slotProps">
              <div class="p-multiselect-representative-option">
                <img
                  :alt="slotProps.option.name"
                  src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                  width="32"
                  style="vertical-align: middle"
                />
                <span class="image-text">{{ slotProps.option.name }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column
        field="status"
        header="Status"
        :showFilterMenu="false"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          <span :class="'customer-badge status-' + data.status">{{
            data.status
          }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="statuses"
            placeholder="Any"
            class="p-column-filter"
            :showClear="true"
          >
            <template #value="slotProps">
              <span
                :class="'customer-badge status-' + slotProps.value"
                v-if="slotProps.value"
                >{{ slotProps.value }}</span
              >
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <span :class="'customer-badge status-' + slotProps.option">{{
                slotProps.option
              }}</span>
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column
        field="verified"
        header="Verified"
        dataType="boolean"
        style="min-width: 6rem"
      >
        <template #body="{ data }">
          <i
            class="pi"
            :class="{
              'true-icon pi-check-circle': data.verified,
              'false-icon pi-times-circle': !data.verified,
            }"
          ></i>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <TriStateCheckbox
            v-model="filterModel.value"
            @change="filterCallback()"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import CustomerService from "./service/CustomerService";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
  data() {
    return {
      customers2: null,
      filters2: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      representatives: [
        { name: "Amy Elsner", image: "amyelsner.png" },
        { name: "Anna Fali", image: "annafali.png" },
        { name: "Asiya Javayant", image: "asiyajavayant.png" },
        { name: "Bernardo Dominic", image: "bernardodominic.png" },
        { name: "Elwin Sharvill", image: "elwinsharvill.png" },
        { name: "Ioni Bowcher", image: "ionibowcher.png" },
        { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
        { name: "Onyama Limba", image: "onyamalimba.png" },
        { name: "Stephen Shaw", image: "stephenshaw.png" },
        { name: "XuXue Feng", image: "xuxuefeng.png" },
      ],
      statuses: [
        "unqualified",
        "qualified",
        "new",
        "negotiation",
        "renewal",
        "proposal",
      ],
      loading2: true,
    };
  },
  created() {
    this.customerService = new CustomerService();
  },
  mounted() {

    this.customerService.getCustomersLarge().then((data) => {
      this.customers2 = data;
      this.loading2 = false;
      this.customers2.forEach(
        (customer) => (customer.date = new Date(customer.date))
      );
    });
  },
  methods: {
    formatDate(value) {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;

  .p-progressbar-value {
    background-color: #607d8b;
  }
}

::v-deep(.p-datepicker) {
  min-width: 25rem;

  td {
    font-weight: 400;
  }
}

::v-deep(.p-datatable.p-datatable-customers) {
  .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }

  .p-paginator {
    padding: 1rem;
  }

  .p-datatable-thead > tr > th {
    text-align: left;
  }

  .p-datatable-tbody > tr > td {
    cursor: auto;
  }

  .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;
  }
}
</style>
