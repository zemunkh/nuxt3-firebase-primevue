import { defineNuxtPlugin } from '#app';

import { FirebaseApp, initializeApp } from 'firebase/app';

declare module '#app' {
  interface NuxtApp {
    $firebaseApp: FirebaseApp;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket
  };

  const app = initializeApp(firebaseConfig);

  nuxtApp.provide('firebaseApp', app);
});