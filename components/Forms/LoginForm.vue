<template>
  <div class="container mt-4">
    <loader :isLoading="isActive"/>
    <ErrorMsg header="Login" :errMessage="authStore.error"></ErrorMsg>
    <Form @submit="loginWithEmail">
      <FormField label="Email" name="email" type="email" v-model="user.email" rules="required|email" />
      <FormField label="Password" name="password" type="password" v-model="user.password" rules="required|min:6" />
      <button type="submit" class="btn btn-primary" style="width: 100%">Login</button>
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
  const { logInUser } = authStore;
  
  const store = useStore();

  const isActive = ref(false)
  const user = reactive({
    email: '',
    password: ''
  })

  const loginWithEmail = async () => {
    isActive.value = true
    await logInUser(user.email, user.password)
    navigateTo('/')
    isActive.value = false
  }
</script>