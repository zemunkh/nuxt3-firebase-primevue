<script setup>
  import { useAuthStore } from "~/store/user";

  definePageMeta({
    middleware: ["auth"]
  })

  useMeta({
    title: '👉 Home',
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  })

  const authStore = useAuthStore();
</script>

<template>
  <div class="container">
    <h1 class="text-center">Home 🏠</h1>

    <div>
      <Fieldset legend="Profile" :toggleable="true">
        <InlineMessage severity="info">ID: {{ authStore.profile.userId }}</InlineMessage><br>
        <InlineMessage severity="info">Firstname: {{ authStore.profile.firstname }}</InlineMessage><br>
        <InlineMessage severity="info">Lastname: {{ authStore.profile.lastname }}</InlineMessage><br>
        <InlineMessage severity="info">Email: {{ authStore.profile.email }}</InlineMessage><br>
        <InlineMessage severity="info">Phone: {{ authStore.profile.phone }}</InlineMessage><br>
        <InlineMessage severity="info">Created On: {{ new Date(authStore.profile.createdOn.seconds * 1000) }}</InlineMessage><br>
      </Fieldset>
    </div>

  </div>
</template>