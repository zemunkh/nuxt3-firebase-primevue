<template>
  <div class="container" style="color: white;">
    <div v-if="pending">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-sm-6" v-for="post in posts" :key="post.id">
        <div class="card card-block" style="min-width: 360px; min-height: 360px;">
          <img class="card-img" :src="post.imageUrl" alt="Card image">
          <div class="card-img-overlay">
            <h3 class="card-title">{{ post.title }}</h3>
            <p class="card-text">{{ post.message }}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useAuthStore } from '~/store/user'
  import { useStore } from '~/store/store'

  const authStore = useAuthStore();
  const store = useStore();

  // useLazyAsyncData as onMounted() property of Vue 3
  const { pending, data: posts } = useLazyAsyncData('posts', () => 
    store.list('posts', authStore.user.uid))
</script>
