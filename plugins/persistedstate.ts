import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import Cookies from 'js-cookie'
import cookie from 'cookie'
import { useStore } from '~/store/store'

export default function ({ $pinia, ssrContext }) {

  if(process.server) {
    const theNick = getNick(ssrContext.req);
    const store = useStore($pinia)
    store.$patch((state) => {
      state.nick = theNick.nick
    })
  }
  
  $pinia.use(
    createPersistedStatePlugin({
      storage: {
        getItem: (key) => {
          if (process.server) {
            const parsedCookies = cookie.parse(ssrContext.req.headers.cookie)
            return parsedCookies[key]
          } else {
            return Cookies.get(key)
          }
        },
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 30, secure: false }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  )
}


const getNick = req => {
  const originHost = `${(req.headers.referer || req.headers['x-forwarded-host'] || req.headers.host || null)}`
  const isLocal = originHost.indexOf('localhost') > 0 ? true : false
  let nick = originHost.replace('https://', '').replace('http://', '').split('.')[0] || 'zee'
  if (nick.indexOf('localhost') > -1 || !nick || nick === 'null') nick = 'zee'
  return { nick, originHost, isLocal }
}
