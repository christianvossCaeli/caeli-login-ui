# Caeli Login UI

Monorepo mit wiederverwendbaren Login-Komponenten fuer React und Vue 3, plus einem geteilten CSS-Paket.

## Pakete

| Paket | Beschreibung |
|-------|-------------|
| `@christianvosscaeli/login-styles` | CSS-Variablen, Layouts, Animationen, SSO- und Auth-Styles |
| `@christianvosscaeli/login-react` | React-Komponenten (LoginLayout, AuthContainer, SsoDivider, MicrosoftSsoButton, ...) |
| `@christianvosscaeli/login-vue` | Vue 3-Komponenten (gleicher Feature-Umfang) |

---

## Installation

```bash
# React-Projekt
pnpm add @christianvosscaeli/login-react @christianvosscaeli/login-styles

# Vue-Projekt
pnpm add @christianvosscaeli/login-vue @christianvosscaeli/login-styles
```

Styles muessen separat importiert werden:

```ts
import '@christianvosscaeli/login-styles';
```

---

## Komponenten

### LoginLayout

Aeusserer Rahmen fuer jede Login-Seite. Stellt Hintergrund, Partikel-Animation, Titel, Footer und die zentrierte Login-Card bereit.

| Prop | Typ | Default | Beschreibung |
|------|-----|---------|-------------|
| `appTitle` | `string` | `"CAELI"` | Haupttitel mit Gradient |
| `appSubtitle` | `string` | — | Untertitel (z.B. `"QR"`, `"CRAWLER"`) |
| `appDescription` | `string` | — | Beschreibungstext unter dem Titel |
| `footerText` | `string` | `"© {year} Caeli Wind"` | Footer-Text |
| `particleCount` | `number` | `20` | Anzahl der Hintergrund-Partikel |
| `children` / Slot | — | **Pflicht** | Inhalt der Login-Card |

---

### AuthContainer

Layout-Wrapper fuer den Authentifizierungsbereich innerhalb der Login-Card. Steuert ueber den `mode`-Prop Spacing und Alignment.

| Prop | Typ | Default | Beschreibung |
|------|-----|---------|-------------|
| `mode` | `'credentials' \| 'sso' \| 'both'` | `'credentials'` | Layout-Modus (siehe unten) |
| `title` | `string` | — | Optionale Ueberschrift ueber dem Inhalt |
| `description` | `string` | — | Optionaler Beschreibungstext |
| `children` / Slot | — | **Pflicht** | Formular, SSO-Buttons oder beides |
| `className` | `string` | — | Zusaetzliche CSS-Klasse |

#### Modi

| Modus | CSS-Klasse | Verhalten |
|-------|-----------|-----------|
| `credentials` | `.auth-container` (Basis) | Standard-Spacing (`gap: 20px`). Fuer reine Formular-Logins. |
| `sso` | `.auth-container--sso` | Engeres Spacing (`gap: 16px`), zentrierter Inhalt. Fuer reine SSO-Flows. |
| `both` | `.auth-container--both` | Kein Gap (`gap: 0`). Spacing wird durch den `SsoDivider` zwischen den Bloecken gesteuert. |

---

### SsoDivider

Visueller Trenner zwischen Formular und SSO-Bereich. Rendert eine horizontale Linie mit zentriertem Text.

| Prop | Typ | Default | Beschreibung |
|------|-----|---------|-------------|
| `text` | `string` | `"or"` | Angezeigter Text (z.B. `"oder"`, `"or"`) |
| `className` | `string` | — | Zusaetzliche CSS-Klasse |

---

### MicrosoftSsoButton

Styled "Sign in with Microsoft"-Button. Rein praesentational — die Auth-Logik wird ueber `onClick` / `@click` angebunden.

| Prop | Typ | Default | Beschreibung |
|------|-----|---------|-------------|
| `onClick` / `@click` | `() => void` | — | Click-Handler |
| `loading` | `boolean` | `false` | Zeigt Lade-Spinner |
| `disabled` | `boolean` | `false` | Deaktiviert den Button |
| `label` | `string` | `"Sign in with Microsoft"` | Button-Text |
| `className` | `string` | — | Zusaetzliche CSS-Klasse |

---

## Microsoft SSO einrichten (Azure / Entra ID)

### Voraussetzungen

- Ein Azure-Konto mit Zugriff auf das [Microsoft Entra Admin Center](https://entra.microsoft.com)
- `@azure/msal-browser` als Peer Dependency installiert:

```bash
pnpm add @azure/msal-browser
```

### 1. App-Registrierung anlegen

1. Im [Entra Admin Center](https://entra.microsoft.com) zu **Identity > Applications > App registrations** navigieren.
2. **New registration** klicken.
3. Formular ausfuellen:
   - **Name**: z.B. `Caeli Login (Dev)`
   - **Supported account types**: Je nach Anforderung:
     - *Single tenant* — nur Benutzer aus eurem eigenen Tenant
     - *Multitenant* — Benutzer aus beliebigen Azure-AD-Organisationen
     - *Multitenant + personal Microsoft accounts* — zusaetzlich Privat-Konten
   - **Redirect URI**:
     - Plattform: **Single-page application (SPA)**
     - URI: `http://localhost:3000` (Entwicklung) bzw. eure Produktions-URL
4. **Register** klicken.

### 2. Werte ablesen

Nach der Registrierung findet ihr auf der **Overview**-Seite:

| Feld | Verwendung | MsalConfig-Prop |
|------|-----------|-----------------|
| **Application (client) ID** | Eindeutige ID eurer App | `clientId` (Pflicht) |
| **Directory (tenant) ID** | Euer Azure-AD-Tenant | `tenantId` (optional, Default: `'common'`) |

### 3. Redirect URIs konfigurieren

Unter **Authentication > Single-page application > Redirect URIs** alle erlaubten URIs eintragen:

```
http://localhost:3000        ← Lokale Entwicklung
http://localhost:5173        ← Vite Dev-Server
https://app.example.com      ← Produktion
```

> Der `useMicrosoftAuth`-Hook nutzt den MSAL **Redirect Flow** (kein Popup).
> Die Redirect URI muss exakt mit `redirectUri` aus der `MsalConfig` uebereinstimmen.

### 4. API-Berechtigungen pruefen

Unter **API permissions** sollte mindestens vorhanden sein:

| API | Berechtigung | Typ | Beschreibung |
|-----|-------------|-----|-------------|
| Microsoft Graph | `User.Read` | Delegated | Profil des angemeldeten Benutzers lesen |

Diese Berechtigung wird standardmaessig bei der Registrierung hinzugefuegt. Falls ihr weitere Scopes benoetigt (z.B. `Mail.Read`, `Calendars.Read`), hier hinzufuegen und ueber den `scopes`-Prop an den Hook uebergeben.

> **Admin Consent**: Fuer Berechtigungen vom Typ *Application* oder solche, die ein `admin_consent` erfordern, muss ein Tenant-Admin einmalig auf **Grant admin consent** klicken.

### 5. Im Code verwenden

```ts
import { useMicrosoftAuth } from '@christianvosscaeli/login-react';
// oder: from '@christianvosscaeli/login-vue'

const { login, logout, isAuthenticated, isLoading, account, error, getAccessToken } =
  useMicrosoftAuth({
    clientId: 'eure-client-id-aus-azure',       // Pflicht
    tenantId: 'euer-tenant-id',                  // Optional, Default: 'common'
    redirectUri: 'http://localhost:3000',         // Optional, Default: window.location.origin
    scopes: ['User.Read'],                       // Optional, Default: ['User.Read']
  });
```

### MsalConfig — Referenz

| Prop | Typ | Default | Beschreibung |
|------|-----|---------|-------------|
| `clientId` | `string` | — | **Pflicht.** Application (client) ID aus der App-Registrierung |
| `tenantId` | `string` | `'common'` | Directory (tenant) ID. `'common'` erlaubt alle Tenants, `'organizations'` nur Geschaeftskonten |
| `redirectUri` | `string` | `window.location.origin` | Muss exakt mit einer registrierten Redirect URI uebereinstimmen |
| `scopes` | `string[]` | `['User.Read']` | OAuth-2.0-Scopes, die beim Login angefordert werden |

### Empfohlene Umgebungsvariablen

Credentials gehoeren nicht in den Code. Empfohlenes Setup:

```env
# .env.local
VITE_AZURE_CLIENT_ID=12345678-abcd-efgh-ijkl-123456789012
VITE_AZURE_TENANT_ID=abcdefgh-1234-5678-abcd-123456789012
```

```ts
useMicrosoftAuth({
  clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
  tenantId: import.meta.env.VITE_AZURE_TENANT_ID,
});
```

Fuer Next.js stattdessen `NEXT_PUBLIC_`-Prefix verwenden.

---

## Anwendungsbeispiele

### SSO-Only

Nur ein SSO-Button, keine Formular-Felder.

**React:**
```tsx
import { LoginLayout, AuthContainer, MicrosoftSsoButton } from '@christianvosscaeli/login-react';
import '@christianvosscaeli/login-styles';

export default function LoginPage() {
  return (
    <LoginLayout appTitle="CAELI" appSubtitle="QR">
      <AuthContainer mode="sso" title="Organisationsanmeldung">
        <MicrosoftSsoButton onClick={handleLogin} loading={isLoading} />
      </AuthContainer>
    </LoginLayout>
  );
}
```

**Vue:**
```vue
<script setup lang="ts">
import { LoginLayout, AuthContainer, MicrosoftSsoButton } from '@christianvosscaeli/login-vue';
import '@christianvosscaeli/login-styles';
</script>

<template>
  <LoginLayout app-title="CAELI" app-subtitle="QR">
    <AuthContainer mode="sso" title="Organisationsanmeldung">
      <MicrosoftSsoButton @click="handleLogin" :loading="isLoading" />
    </AuthContainer>
  </LoginLayout>
</template>
```

---

### Credentials + SSO (Combined)

Formular und SSO-Button, getrennt durch einen Divider.

**React:**
```tsx
import { LoginLayout, AuthContainer, SsoDivider, MicrosoftSsoButton } from '@christianvosscaeli/login-react';
import '@christianvosscaeli/login-styles';

export default function LoginPage() {
  return (
    <LoginLayout appTitle="CAELI">
      <AuthContainer mode="both">
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="E-Mail" />
          <input type="password" placeholder="Passwort" />
          <button type="submit">Anmelden</button>
        </form>
        <SsoDivider text="oder" />
        <MicrosoftSsoButton onClick={handleSsoLogin} />
      </AuthContainer>
    </LoginLayout>
  );
}
```

**Vue:**
```vue
<script setup lang="ts">
import { LoginLayout, AuthContainer, SsoDivider, MicrosoftSsoButton } from '@christianvosscaeli/login-vue';
import '@christianvosscaeli/login-styles';
</script>

<template>
  <LoginLayout app-title="CAELI">
    <AuthContainer mode="both">
      <form @submit.prevent="handleSubmit">
        <input type="email" placeholder="E-Mail" />
        <input type="password" placeholder="Passwort" />
        <button type="submit">Anmelden</button>
      </form>
      <SsoDivider text="oder" />
      <MicrosoftSsoButton @click="handleSsoLogin" />
    </AuthContainer>
  </LoginLayout>
</template>
```

---

### Credentials-Only (Standard)

Klassisches Formular ohne SSO.

**React:**
```tsx
<LoginLayout appTitle="CAELI">
  <AuthContainer mode="credentials">
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="E-Mail" />
      <input type="password" placeholder="Passwort" />
      <button type="submit">Anmelden</button>
    </form>
  </AuthContainer>
</LoginLayout>
```

Da `credentials` der Default ist, kann `mode` auch weggelassen werden:

```tsx
<AuthContainer>
  <form>...</form>
</AuthContainer>
```

---

## Selective CSS Imports

Statt des gesamten Bundles koennen einzelne Module importiert werden:

```ts
import '@christianvosscaeli/login-styles/variables'; // Nur CSS-Variablen
import '@christianvosscaeli/login-styles/sso';       // Nur SSO-Button + Divider Styles
import '@christianvosscaeli/login-styles/auth';      // Nur AuthContainer Styles
import '@christianvosscaeli/login-styles/animations'; // Nur Animationen
```

---

## Entwicklung

```bash
# Dependencies installieren
pnpm install

# Alle Pakete bauen
pnpm build

# Einzelnes Paket bauen
pnpm --filter @christianvosscaeli/login-styles build
pnpm --filter @christianvosscaeli/login-react build
pnpm --filter @christianvosscaeli/login-vue build
```

---

## TypeScript

Alle Komponenten sind vollstaendig typisiert. Die wichtigsten Typen koennen direkt importiert werden:

```ts
import type {
  AuthContainerProps,
  AuthContainerMode,
  SsoDividerProps,
  LoginLayoutProps,
  MicrosoftSsoButtonProps,
} from '@christianvosscaeli/login-react';
// oder
// from '@christianvosscaeli/login-vue';
```
