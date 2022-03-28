<template>
  <div class="container" style="width: 540px;">
    <div class="container mt-5">
      <ul class="nav nav-tabs nav-fill justify-content-center" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">Login</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab" aria-controls="signup" aria-selected="false">Register</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
          <LoginForm/>
        </div>
        <div class="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
          <Register/>
        </div>
      </div>
    </div>

    <br>
    
    <div class="d-flex justify-content-center">
      <h2 class="d-flex justify-content-center">{{ store.counter }}</h2>
    </div>
    <div class="d-grid gap-2 col-6 mx-auto">
      <button @click="store.increment()"  class="btn btn-outline-primary" type="button">Add</button>
      <button @click="store.decrement()" class="btn btn-outline-success" type="button">Subtract</button>
    </div>

  </div>
</template>

<script>
  import { useStore } from '~/store/store'
  import LoginForm from "~/components/Forms/LoginForm";
  import Register from "~/components/Forms/Register";
  export default defineComponent({
    components: { LoginForm, Register },
    setup() {
      const store = useStore();
      useMeta({
        title: `👉 ${store.nick === '' ? 'zemunkh' : store.nick}`
      })
      definePageMeta({
        middleware: ["auth"]
      });
      const counter = ref(0);
      counter.value = store.counter

      return {
        counter,
        store,
      }
    }
  });
</script>

<script setup>
</script>