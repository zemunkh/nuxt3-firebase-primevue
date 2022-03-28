<template>
  <div class="container mt-4">
    <loader :isLoading="isActive"/>
    <ErrorMsg header="Register" :errMessage="authStore.error"></ErrorMsg>
    <Form @submit="signUpWithEmail">

      <FormField label="Firstname" name="firstname" type="text" v-model="userForm.firstname" rules="required" />
      <FormField label="Lastname" name="lastname" type="text" v-model="userForm.lastname" rules="required" />
      <FormField label="Phone" name="phone" type="text" v-model="userForm.phone" rules="required|min:8" />

      <FormField label="Email" name="registerEmail" type="email" v-model="userForm.email" rules="required|email" />
      <FormField label="Password" name="registerPassword" type="password" v-model="userForm.password" rules="required|min:6" />
      
      <button type="submit" :disabled="false" class="btn btn-primary" style="width: 100%">Register</button>
    </Form>
  </div>
</template>


<script setup>
  import { useStore } from '~/store/store'
  import { useAuthStore } from '~/store/user'
  import Loader from '~/components/Tools/Loader'
  import ErrorMsg from "~/components/Tools/ErrorMsg";
  import FormField from "~/components/Forms/FormField/FormField";
  import { Form } from 'vee-validate';

  const authStore = useAuthStore();
  const { createAccount } = authStore;
  authStore.error = ''
  const store = useStore();

  const isActive = ref(false)

  const userForm = reactive({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
  });

  const signUpWithEmail = async () => {
    isActive.value = true
    await createAccount(userForm.email, userForm.password, userForm.firstname, userForm.lastname, userForm.phone);
    navigateTo('/')
    isActive.value = false
  };
</script>