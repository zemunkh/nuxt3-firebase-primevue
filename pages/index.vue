<script setup>
  definePageMeta({
    middleware: ["auth"]
  })

  useMeta({
    title: '👉 Home',
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }) 
</script>

<template>
  <div class="container">
    <h1>Home 🏠</h1>
  </div>
</template>