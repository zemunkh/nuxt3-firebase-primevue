# Yes4nuxt development

## Setup

Make sure to install the dependencies

```bash
npm install
```

Current workaround for error 'ReferenceError: IDBIndex is not defined'

```bash
npm i firebase@9.6.7 —save-exact
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