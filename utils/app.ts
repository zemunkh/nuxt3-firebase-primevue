import { LanguageManager } from './lang'

export interface IApp {
  name: string
  author: {
    name: string
    link: string
  }
}

export function AppSetup() {
  // declare app information
  const app: IApp = {
    name: 'Nuxt 3 with Firebase',
    author: {
      name: 'zemunkh',
      link: 'https://github.com/zemunkh',
    },
  }
  useState('app', () => app)

  // use language manager
  const languageManager = LanguageManager()

  return {
    app,
    languageManager,
  }
}
