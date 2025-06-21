/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, it, expect } from 'vitest'
import StorageBuilder from '../lib/storagebuilder'

describe('StorageBuilder', () => {

    it('build a session storage', () => {
        const builder = new StorageBuilder('mail')

        const storage = builder
            .persist()
            .build()

        expect(storage).not.toEqual(undefined)
    })

    it('build a local storage', () => {
        const builder = new StorageBuilder('mail')

        const storage = builder
            .build()

        expect(storage).not.toEqual(undefined)
    })

})
