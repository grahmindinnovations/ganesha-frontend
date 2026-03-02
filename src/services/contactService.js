import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/app'

export async function saveContactLead(payload) {
  const { name, email, phone, city, businessName, message } = payload

  await addDoc(collection(db, 'users'), {
    name: name || '',
    email: email || '',
    phone: phone || '',
    city: city || '',
    businessName: businessName || '',
    message: message || '',
    source: 'landing-contact',
    createdAt: serverTimestamp(),
  })
}