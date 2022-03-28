<template>
  <div class="container">
    <h1 class="text-center">Firestore demo 🕹</h1>

    <div>
      <Fieldset legend="Get first item" :toggleable="true">
        <p>
          'List' get documents from <b>products/yes/products</b> collection.
        </p>
        <Button @click="getFirstItem()">Get First item from the list</Button>
        <p><b>Document ID:</b> {{ firstItem.id }}</p>
        <p>{{ firstItem }}</p>
      </Fieldset>
    </div>

    <div>
      <Fieldset legend="Get" :toggleable="true">
        <p>
          'Get' fetch document from <b>products/yes/products</b> collection.
        </p>
        <h5>Document ID to get</h5>
        <InputText type="text" v-model="idText" placeholder="Document id to fetch"/>
        <Button @click="getItem()">Get</Button>
        <p>Result: {{ resultGet }}</p>
      </Fieldset>
    </div>

    <div>
      <Fieldset legend="Add" :toggleable="true">
        <p>
          'Add' adds data with 'dummy' id to <b>products/yes/products</b> collection.
        </p>
        <InputText type="text" v-model="dummyText" placeholder="Dummy text"/>
        <Button @click="addDummy()">Add dummy</Button>
        <p>Result: {{ resultAdd }}</p>
      </Fieldset>
    </div>

    <div>
      <Fieldset legend="Update" :toggleable="true">
        <p>
          'Update' updates data with 'dummy' id to <b>products/yes/products</b> collection.
        </p>
        <InputText type="text" v-model="idDummy" placeholder="Document ID"/>
        <InputText type="text" v-model="dummyText" placeholder="Dummy text"/>
        <Button @click="updateDummy()">Update dummy</Button>
        <p>Result: {{ resultUpdate }}</p>
      </Fieldset>
    </div>

    <div>
      <Fieldset legend="Set" :toggleable="true">
        <p>
          'Set' sets data with 'dummy' id to <b>products/yes/products</b> collection.
        </p>
        <InputText type="text" v-model="idDummy" placeholder="Document ID"/>
        <InputText type="text" v-model="dummyText" placeholder="Dummy text"/>
        <Button @click="setDummy()">Set dummy</Button>
        <p>Result: {{ resultSet }}</p>
      </Fieldset>
    </div>

    <div>
      <Fieldset legend="Remove" :toggleable="true">
        <h4>Soft delete</h4>
        <p>
          'Remove' delete data with 'dummy' id to <b>products/yes/products</b> collection.
        </p>
        <InputText type="text" v-model="idDummy" placeholder="Document ID"/>
        <Button @click="removeDummy()">Remove dummy</Button>
        <p>Result: {{ resultRemove }}</p>
      </Fieldset>
    </div>

    <div>
      <Fieldset legend="List" :toggleable="true">
        <p>
          'List' gets documents as list with 25 items from <b>products/yes/products</b> collection.
        </p>
        <GenericTable :config="productDemoConfig"/>
      </Fieldset>
    </div>


  </div>
</template>

<script setup>
  import GenericTable from "~~/components/Tables/GenericTable.vue";
  import productDemoConfig from "~~/components/configs/productDemo";
  import { useStore } from "~/store/store";

  const firstItem = ref('');
  const resultGet = ref('')
  const resultAdd = ref('')
  const resultUpdate = ref('')
  const resultSet = ref('')
  const resultRemove = ref('')
  const idText = ref('')
  const idDummy = ref('')
  const dummyText = ref('')

  const store = useStore();

  const getFirstItem = async () => {
    const result = await store.list('products', [['fnac', '==', false]], null, store.nick)
    firstItem.value = result[0];
  }

  const getItem = async () => {
    const result = await store.get('products', idText.value)
    resultGet.value = result
  }

  const addDummy = async () => {
    const result = await store.add('products', {text: dummyText.value})
    resultAdd.value = result
  }

  const updateDummy = async () => {
    const result = await store.update('products', idDummy.value, {text: dummyText.value})
    resultUpdate.value = result
  }

  const setDummy = async () => {
    const result = await store.set('products', idDummy.value, {text: dummyText.value})
    resultSet.value = result
  }

  const removeDummy = async () => {
    const result = await store.remove('products', idDummy.value)
    resultRemove.value = result
  }

</script>

<style scoped></style>
