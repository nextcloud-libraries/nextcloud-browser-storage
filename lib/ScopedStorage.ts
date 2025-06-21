/*
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export default class ScopedStorage implements Storage {
	public static GLOBAL_SCOPE_VOLATILE = 'nextcloud_vol'
	public static GLOBAL_SCOPE_PERSISTENT = 'nextcloud_per'
	private scope: string
	private wrapped: Storage

	constructor(scope: string, wrapped: Storage, persistent: boolean) {
		this.scope = `${persistent ? ScopedStorage.GLOBAL_SCOPE_PERSISTENT : ScopedStorage.GLOBAL_SCOPE_VOLATILE}_${btoa(scope)}_`
		this.wrapped = wrapped
	}

	private scopeKey(key: string) {
		return `${this.scope}${key}`
	}

	get #keys() {
		return Object.keys(this.wrapped)
			.filter((key) => key.startsWith(this.scope))
	}

	get length(): number {
		return this.#keys.length
	}

	key(index: number): string | null {
		return this.#keys[index] ?? null
	}

	getItem(key: string): string | null {
		return this.wrapped.getItem(this.scopeKey(key))
	}

	setItem(key: string, value: string): void {
		this.wrapped.setItem(this.scopeKey(key), value)
	}

	removeItem(key: string): void {
		this.wrapped.removeItem(this.scopeKey(key))
	}

	clear(): void {
		for (const key of this.#keys) {
			this.wrapped.removeItem(key)
		}
	}
}
