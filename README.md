<!--
  - SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->

# @nextcloud/browser-storage

![GitHub package.json version](https://img.shields.io/github/package-json/v/nextcloud-libraries/nextcloud-browser-storage?style=flat) [![NPM Version](https://img.shields.io/npm/v/%40nextcloud%2Fbrowser-storage?style=flat)](https://npmjs.org/@nextcloud/browser-storage)
[![BundleJS Size](https://deno.bundlejs.com/badge?q=@nextcloud/browser-storage&treeshake=%5B%7B+getBuilder+%7D%5D)](https://bundlejs.com/?q=%40nextcloud%2Fbrowser-storage%400.4.0&treeshake=%5B%7B+getBuilder+%7D%5D)
[![License](https://img.shields.io/github/license/nextcloud-libraries/nextcloud-browser-storage)](https://github.com/nextcloud-libraries/nextcloud-browser-storage/blob/main/LICENSE)
[![REUSE status](https://api.reuse.software/badge/github.com/nextcloud-libraries/nextcloud-browser-storage)](https://api.reuse.software/info/github.com/nextcloud-libraries/nextcloud-browser-storage)

> Scoped [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) (`localStorage`) wrapper for Nextcloud apps and libraries

Using `localStorage` directly in Nextcloud apps is risky due to potential key conflicts.

```ts
// ❌ Could conflict with other apps
localStorage.setItem('favorite_emoji', '💙')
```

`@nextcloud/browser-storage` provides a drop-in replacement that scopes storage keys to prevent collisions.

## Installation

```sh
npm install @nextcloud/browser-storage
```

## Usage

Add a new module to create and export the browser storage instance.

```ts
// 📁 browserStorage.ts

import { getBuilder } from '@nextcloud/browser-storage'

// Use you application id
export const browserStorage = getBuilder('my-app-id')
  .persist()
  .build()

// Or without `.persist()` if you need a `sessionStorage` wrapper instead of a `localStorage`
export const browserSessionStorage = getBuilder('my-app-name').build()
```

Use `browserStorage` as `localStorage` (or `sessionStorage`) replacement.

```ts
import { browserStorage } from './path/to/browserStorage.ts'

// ✅ No risk to conflict with other apps
// Actual key: `nextcloud_per_bXktYXBwLW5hbWU=_favorite_emoji`

const favoriteEmoji = browserStorage.getItem('favorite_emoji')
browserStorage.setItem('favorite_emoji', '💙')
browserStorage.removeItem('favorite_emoji')
browserStorage.clear()
```

**Note:** some Web Storage API is not available yet

```ts
// 🚧 Not available yet
browserStorage.key('favoriteEmoji') 
browserStorage.length

// 🚧 Listens to all Web Storage changes
window.addEventListener('storage', () => {})
```

## API Reference

[https://nextcloud-libraries.github.io/nextcloud-browser-storage/](https://nextcloud-libraries.github.io/nextcloud-browser-storage/)
