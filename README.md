# Subberry Admin Portal

A responsive React + TypeScript admin portal for the Subberry platform.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:5173/` and sign in with Google or Apple using a Firebase admin account.

For local UI development without Firebase sign-in, open `http://127.0.0.1:5173/?demo=true`. This development-only mode grants the `Super Admin` demo role and displays a notice; it is disabled in production builds. Dashboard and management records are sample data.

## Build

```powershell
npm run build
npm run preview
```

## Firebase setup

1. Create a Firebase project and enable **Google** and **Apple** under **Authentication → Sign-in method**.
2. Create a Firestore database and Storage bucket.
3. Copy `.env.example` to `.env.local`.
4. Add the Firebase web app configuration values to `.env.local`.
5. Never add service-account private keys or payment secrets to this frontend project.
6. Implement privileged actions through Firebase Authentication custom claims and Cloud Functions with server-side role verification.

The portal uses Google and Apple Firebase Authentication with redirect flows. Add the deployed website domain in **Authentication → Settings → Authorized domains**. Apple also requires Apple Developer configuration (Service ID, Team ID, Key ID, and private key) in Firebase's Apple provider settings.

This Vite app provides a responsive mobile web sign-in, not native Android/iOS apps. Native apps require Firebase Android/iOS app registrations and the corresponding native SDK integrations (or a framework such as Flutter or React Native).

Authentication uses Firebase Google and Apple sign-in only. Dashboard and management records remain sample demo data. Firebase initialization is in `src/services/firebase.ts`.

### Admin role claims

Authentication reads the `role` custom claim from the Firebase ID token. Assign exactly one of these values to an admin account:

- `Super Admin`
- `Business Verification Admin`
- `Finance Admin`
- `Support Admin`

Accounts without one of these claims are signed out and denied access. Set claims only from a trusted Firebase Admin SDK process or Cloud Function; do not set admin claims from this React application.
