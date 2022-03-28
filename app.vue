<template>
  <Header />
    <NuxtPage />

</template>

<script lang="ts" setup>
  import { AppSetup } from './utils/app'
  AppSetup()
  const locale = useState<string>('locale.setting')
</script>
