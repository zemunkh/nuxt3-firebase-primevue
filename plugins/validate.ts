import { defineRule, configure } from 'vee-validate'
import { required, email, min, url } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json';
import pt from '@vee-validate/i18n/dist/locale/pt_PT.json';
import fr from '@vee-validate/i18n/dist/locale/fr.json';
import ja from '@vee-validate/i18n/dist/locale/ja.json';
// import firebase from '@/helpers/firebase'
export default () => {
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('url', url)
  // defineRule('unique', async (value, args) => {
  //   let collection, field, excluding
  //   if (Array.isArray(args)) {
  //     [collection, field, excluding] = args
  //   } else {
  //     ({ collection, field, excluding } = args)
  //   }
  //   if (value === excluding) return true
  //   const querySnapshot = await firebase.firestore().collection(collection).where(field, '==', value).get()
  //   return querySnapshot.empty
  // })

  configure({
    generateMessage: localize({
      en,
      pt,
      fr,
      ja
    }),
  });
}