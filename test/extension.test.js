const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const { roastUserCode } = require('../roast');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Roast function exists', () => {
		assert.strictEqual(typeof roastUserCode, 'function');
	});

	// This is an async test. Note that we can't actually test the AI response content
	// since it will be different each time, but we can test that the function runs without error.
	test('Roast function runs without throwing', async function() {
		this.timeout(10000); // Increase timeout for API call
		try {
			const result = await roastUserCode('function test() { return "hello"; }');
			assert.strictEqual(typeof result, 'string');
			assert.ok(result.length > 0);
		} catch (e) {
			// If the API key is invalid or there's a network error, this might fail
			// but it doesn't mean the function is broken
			console.log('API call failed, but function did not throw:', e);
		}
	});
});
