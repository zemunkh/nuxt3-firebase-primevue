import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  limit,
  orderBy,
  startAfter
} from 'firebase/firestore';

// import firebaseApp from './firebaseInit';
import { useStore } from '~/store/store'

export const useFirestore = () => {
  const { $firebaseApp } = useNuxtApp()
  const db = getFirestore($firebaseApp);
  const store = useStore();
  console.log('On firestore Nick: ', store.nick);

  // clean the snapshots listeners unsubscribe()
  const createId = () => { return btoa(new Date().getTime().toString()).replace(new RegExp('=', 'g'), '') }

  const getPath = (collection) =>  {
    let path;
    if(store.nick === 'zemunkh' || store.nick === 'yesmkt') {
      path = `${collection}/apple/${collection}`
    } else {
      path = `${collection}/${store.nick}/${collection}`
    }
    console.log('Path 🚨: ', path);
    return path;
  }

  const get = async (_col, id) => {
    const path = getPath(_col)
    console.log('🖖🏼', process.client, path, id);
    const docRef = doc(db, path, id)
    try {
      const snapshot = await getDoc(docRef)
      const doc = snapshot.data()
      if (!doc) {
        console.log('Document does not exist.')
        return
      }
      return doc
    } catch (e) {
      console.log(e)
    }
  }

  const add = async (_col, payload) => {
    const id = createId()
    console.log(_col, id, payload)
    const res = await set (_col, id, payload)
    return res
  }

  const set = async (_col, id, payload) => {
    const path = getPath(_col)
    // console.log(db, path, id, payload)
    const docRef = doc(db, path, id)
    
    try {
      const res = await setDoc(docRef, payload)
      return res
    } catch (e) {
      console.log(e)
      return
    }
  }

  const update = async (_col, id, payload) => {
    const path = getPath(_col)
    const docRef = doc(db, path, id)
    try {
      const res = await updateDoc(docRef, payload)
      return res
    } catch (e) {
      console.log(e)
      return
    }
  }

  const merge = async (_col, id, payload) => {
    const path = getPath(_col)
    const docRef = doc(db, path, id)
    try {
      const res = await setDoc(docRef, payload, { merge: true })
      return res
    } catch (e) {
      console.log(e)
      return
    }
  }

  const remove = async (_col, id) => {
    const path = getPath(_col)
    const docRef = doc(db, path, id)
    try {
      const res = await updateDoc(docRef, { active: false })
      return res
    } catch (e) {
      console.log(e)
    }
  }

  const list = async (_col, args) => {
    const path = getPath(_col)
    console.log('Is Client 👁🚨: ', process.client);
    
    const col = collection(db, path)
    const qry = []
    if (args && args.where) for (const w of args.where) qry.push(where(w[0], w[1], w[2]))
    if (args && args.orderBy) qry.push(orderBy(args.orderBy, args.direction ? args.direction : 'asc'))
    if (args && args.limit) qry.push(limit(args.limit))
    if (args && args.startAfter) {
      const docRef = doc(db, path, args.startAfter.id)
      const snapshot = await getDoc(docRef)
      qry.push(startAfter(snapshot))
    }
    const q = qry.length ? query(col, ...qry) : query(col)
    const querySnapshot = await getDocs(q)
    const docs = []

    querySnapshot.forEach((doc) => {
      let _doc = doc.data()
      _doc.id = doc.id
      docs.push(_doc)
    })

    const unsub = onSnapshot(q, async (qs) => {
      const _document = []
      qs.forEach((doc) => {
        let _doc = doc.data()
        _doc.id = doc.id
        _document.push(_doc)
      })
      store.products = _document
      console.log('Changed... 🚨', _document)
    })
    return docs
  }

  return {
    db,
    get,
    set,
    add,
    update,
    merge,
    remove,
    list
  }
}