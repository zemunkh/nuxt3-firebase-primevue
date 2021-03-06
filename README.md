<h2 align="center">
Nuxt 3 Firebase starter with PrimeVue
</h2><br>

<pre align="center">
๐งช Working in Progress
</pre>

<p align="center">
<br>
<a href="https://nuxt3-zemunkh.web.app">๐ฅ Online Preview</a>
<br><br>
</p>

## Features

- [๐ Nuxt 3](https://v3.nuxtjs.org) - SSR, ESR, File-based routing, components auto importing, modules, etc.

- ๐ฅ The `<script setup>` syntax

- ๐  Firebase v9 for Firestore database services

- ๐ The PrimeVue for styled components

- ๐ฝ The Boostrap 5 for style

- ๐ [State Management via Pinia](https://pinia.esm.dev/)

- ๐ + ๐ฝ  pinia-plugin-persistedstate-2 plugin for saving stores locally

- ๐ฆ VeeValidate for input forms with i18n support

- ๐ intlify/i18n support, now supports ๐ฌ๐ง, ๐ซ๐ท, ๐ต๐น, ๐ฏ๐ต

- ๐ฅ APIs auto importing - for Composition API, VueUse and custom composables.

- ๐ Firebase cloud functions and deploy

- ๐ฆพ Mainly TypeScript

## Plugins

### Nuxt Modules

- [Firebase v9](https://firebase.google.com/docs/auth/web/custom-dependencies) - New version of Firebase services
- [TailwindCSS](https://tailwindcss.com/docs/installation) - It's fast, flexible, and reliable โ with zero-runtime.
- [Pinia](https://pinia.esm.dev/) - intuitive, type safe, light and flexible Store for Vue.

## IDE

We recommend using [VS Code](https://code.visualstudio.com/) with [Volar](https://github.com/johnsoncodehk/volar) to get the best experience (You might want to disable Vetur if you have it).


# Nuxt3 Firebase Starter with PrimeVue development

## Setup

Make sure to install the dependencies

```bash
npm install
```

Current workaround for error 'ReferenceError: IDBIndex is not defined'

```bash
npm i firebase@9.6.7 โsave-exact
```

Or you may face the following error

```bash
ERROR  nuxi requires @nuxt/kit to be installed in your project. Try installing nuxt3 or @nuxt/bridge first.  
```

Then do the following and yarn install do the rest of it.

```bash
npx nuxi upgrade --force
```

Then

```bash
npm run dev
```

## Preview

Delete .output folder and run below commands

```bash
npm run build
npx nuxi preview
```

## Production

Build the application for production:

```bash
NITRO_PRESET=firebase yarn build
```

Using emulators, you can preview the result on locally
```bash
firebase emulators:start 
```

Deploy
```bash
firebase deploy
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).