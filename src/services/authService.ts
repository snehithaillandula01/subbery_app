import {
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  type User,
} from 'firebase/auth'
import { firebaseAuth, isFirebaseConfigured } from './firebase'

export type AdminRole =
  | 'Super Admin'
  | 'Business Verification Admin'
  | 'Finance Admin'
  | 'Support Admin'

const roles: AdminRole[] = [
  'Super Admin',
  'Business Verification Admin',
  'Finance Admin',
  'Support Admin',
]

export function getAdminRole(user: User): Promise<AdminRole | null> {
  return user.getIdTokenResult(true).then(result => {
    const role = result.claims.role
    return typeof role === 'string' && roles.includes(role as AdminRole)
      ? role as AdminRole
      : null
  })
}

export function observeFirebaseAuth(callback: (user: User | null) => void) {
  if (!firebaseAuth) return () => undefined
  return onAuthStateChanged(firebaseAuth, callback)
}

export async function loginWithGoogle(remember: boolean) {
  if (!firebaseAuth) throw new Error('Firebase Authentication is not configured.')
  await setPersistence(firebaseAuth, remember ? browserLocalPersistence : browserSessionPersistence)
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  await signInWithRedirect(firebaseAuth, provider)
}

export async function loginWithApple(remember: boolean) {
  if (!firebaseAuth) throw new Error('Firebase Authentication is not configured.')
  await setPersistence(firebaseAuth, remember ? browserLocalPersistence : browserSessionPersistence)
  const provider = new OAuthProvider('apple.com')
  provider.addScope('email')
  provider.addScope('name')
  await signInWithRedirect(firebaseAuth, provider)
}

export function completeAuthRedirect() {
  if (!firebaseAuth) return Promise.resolve(null)
  return getRedirectResult(firebaseAuth)
}

export function logoutFromFirebase() {
  if (!firebaseAuth) return Promise.resolve()
  return signOut(firebaseAuth)
}

export { isFirebaseConfigured }
