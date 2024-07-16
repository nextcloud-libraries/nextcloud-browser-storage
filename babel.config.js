/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
module.exports = {
	presets: [
		'@babel/typescript',
		[
			'@babel/env',
			{
				useBuiltIns: 'usage',
				corejs: '3.0.0',
			},
		],
	],
	plugins: [
		'@babel/plugin-proposal-class-properties',
	],
}
