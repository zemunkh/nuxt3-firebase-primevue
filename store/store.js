import { defineStore } from 'pinia'
import { useFirestore } from '~~/composables/useFirestore'

export const useStore = defineStore('global', {
  state: () => ({
    counter: 0,
    items: [],
    nick: '',
    posts: [],
    products: []
  }),
  actions: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    },
    async list(collection, where = [['fnac', '==', false]], startAfter, nick, limit = 25 ) {
      if(this.nick === '') { this.nick = nick; console.log('Nick changed! 🚨');}
      const { list } = useFirestore()
      try {
        const data = await list(collection,
        {
          where: where,
          startAfter: startAfter,
          limit: limit,
          api: false
        })
        this[collection] = data ? data : null
        this.error = null;
        console.log('Length ✅: ', data.length);
        return this[collection]
      } catch (e) {
        this.posts = []
        this.error = e;
        return false;
      }
    },
    async add(collection, payload) {
      const { add } = useFirestore()
      console.log(collection, payload)
      try {
        const data = await add(collection, payload)
        this.error = null;
        console.log('Add ✅: ',data.id)
        return data.id;
      } catch (e) {
        this.error = e;
        return false;
      }
    },
    async get(collection, id) {
      const { get } = useFirestore()
      try {
        const snap = await get(collection, id)
        this.error = null
        return snap
      } catch (e) {
        this.error = e;
        return false;
      }
    },
    async set(collection, id, payload) {
      const { set } = useFirestore()
      try {
        const res = await set(collection, id, payload)
        this.error = null;
        console.log('Set ✅: ', res)
        return res;
      } catch (e) {
        this.error = e;
        return false;
      }
    },
    async update(collection, id, payload) {
      const { update } = useFirestore()
      try {
        const res = await update(collection, id, payload)
        this.error = null;
        console.log('Update ✅: ', res)
        return res;
      } catch (e) {
        this.error = e;
        return false;
      }
    },
    async remove(collection, id) {
      const { remove } = useFirestore()
      try {
        const res = await remove(collection, id)
        this.error = null;
        console.log('Remove ✅: ', res)
        return res;
      } catch (e) {
        this.error = e;
        return false;
      }
    },

  },
  getters: {
    counterValue: (state) => state.counter
  }
})
