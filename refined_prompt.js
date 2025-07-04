/**
 * Converts a string to camelCase format.
 *
 * This function transforms the input string into camelCase by:
 * - Replacing all spaces, hyphens, underscores, and dots with spaces.
 * - Removing all non-alphanumeric characters except spaces.
 * - Splitting the string into words.
 * - Lowercasing the first word and capitalizing the first letter of subsequent words.
 * - Concatenating the words without spaces.
 *
 * Edge Cases:
 * - Returns an empty string for empty or whitespace-only input.
 * - Throws a TypeError if the input is not a string.
 * - Does not split existing camelCase words (e.g., "fooBar" becomes "foobar").
 *
 * @param {string} input - The string to convert to camelCase.
 * @returns {string} The camelCase formatted string.
 * @throws {TypeError} If the input is not a string.
 */

/**
 * Converts a string to dot.case format.
 *
 * This function transforms the input string into dot.case by:
 * - Replacing all spaces, hyphens, underscores, and dots with spaces.
 * - Removing all non-alphanumeric characters except spaces.
 * - Splitting the string into words.
 * - Lowercasing all words.
 * - Joining the words with dots ('.').
 *
 * Edge Cases:
 * - Returns an empty string for empty or whitespace-only input.
 * - Throws a TypeError if the input is not a string.
 * - Does not split existing camelCase words (e.g., "fooBar" becomes "foobar").
 *
 * @param {string} input - The string to convert to dot.case.
 * @returns {string} The dot.case formatted string.
 * @throws {TypeError} If the input is not a string.
 */

function camelCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    if (!input.trim()) return '';

    // Replace all separators with spaces, remove non-alphanumeric except spaces
    let cleaned = input
        .replace(/[\s\-_\.]+/g, ' ')
        .replace(/[^a-zA-Z0-9 ]+/g, '')
        .trim();

    if (!cleaned) return '';

    let words = cleaned.split(' ');
    return words
        .map((word, idx) => {
            if (idx === 0) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

// --- Test cases ---
const tests = [
    { input: '', expected: '' },
    { input: ' ', expected: '' },
    { input: 'hello world', expected: 'helloWorld' },
    { input: 'Hello-World', expected: 'helloWorld' },
    { input: 'hello_world', expected: 'helloWorld' },
    { input: 'hello.world', expected: 'helloWorld' },
    { input: 'hello--world__test', expected: 'helloWorldTest' },
    { input: '  hello   world  ', expected: 'helloWorld' },
    { input: 'hello123world', expected: 'hello123world' },
    { input: '123hello world', expected: '123helloWorld' },
    { input: 'hello@world!', expected: 'helloWorld' },
    { input: 'HELLO_WORLD', expected: 'helloWorld' },
    { input: 'foo-bar_baz.qux', expected: 'fooBarBazQux' },
    { input: 'foo--bar__baz..qux', expected: 'fooBarBazQux' },
    { input: 'foo 123 bar', expected: 'foo123Bar' },
    { input: 'foo$%^bar', expected: 'fooBar' },
    { input: 'foo', expected: 'foo' },
    { input: 'FOO', expected: 'foo' },
    { input: 'fooBar', expected: 'foobar' }, // not splitting camelCase
    { input: null, expectedError: true },
    { input: 123, expectedError: true },
    { input: {}, expectedError: true },
];

tests.forEach(({ input, expected, expectedError }, idx) => {
    try {
        const result = camelCase(input);
        if (expectedError) {
            console.error(`Test ${idx + 1} FAILED: Expected error for input:`, input);
        } else if (result !== expected) {
            console.error(`Test ${idx + 1} FAILED: Input: "${input}" | Expected: "${expected}" | Got: "${result}"`);
        } else {
            console.log(`Test ${idx + 1} passed.`);
        }
    } catch (e) {
        if (expectedError) {
            console.log(`Test ${idx + 1} passed (caught expected error).`);
        } else {
            console.error(`Test ${idx + 1} FAILED: Unexpected error for input:`, input, e);
        }
    }
});

/**
 * Converts a string to dot.case.
 * Handles spaces, hyphens, underscores, dots, numbers, and special characters.
 * Throws TypeError for non-string inputs.
 * @param {string} input
 * @returns {string}
 */
function dotCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    if (!input.trim()) return '';

    // Replace all separators with spaces, remove non-alphanumeric except spaces
    let cleaned = input
        .replace(/[\s\-_\.]+/g, ' ')
        .replace(/[^a-zA-Z0-9 ]+/g, '')
        .trim();

    if (!cleaned) return '';

    let words = cleaned.split(' ');
    return words
        .map(word => word.toLowerCase())
        .join('.');
}

// --- Test cases for dotCase ---
const dotTests = [
    { input: '', expected: '' },
    { input: ' ', expected: '' },
    { input: 'hello world', expected: 'hello.world' },
    { input: 'Hello-World', expected: 'hello.world' },
    { input: 'hello_world', expected: 'hello.world' },
    { input: 'hello.world', expected: 'hello.world' },
    { input: 'hello--world__test', expected: 'hello.world.test' },
    { input: '  hello   world  ', expected: 'hello.world' },
    { input: 'hello123world', expected: 'hello123world' },
    { input: '123hello world', expected: '123hello.world' },
    { input: 'hello@world!', expected: 'hello.world' },
    { input: 'HELLO_WORLD', expected: 'hello.world' },
    { input: 'foo-bar_baz.qux', expected: 'foo.bar.baz.qux' },
    { input: 'foo--bar__baz..qux', expected: 'foo.bar.baz.qux' },
    { input: 'foo 123 bar', expected: 'foo.123.bar' },
    { input: 'foo$%^bar', expected: 'foo.bar' },
    { input: 'foo', expected: 'foo' },
    { input: 'FOO', expected: 'foo' },
    { input: 'fooBar', expected: 'foobar' }, // not splitting camelCase
    { input: null, expectedError: true },
    { input: 123, expectedError: true },
    { input: {}, expectedError: true },
];

dotTests.forEach(({ input, expected, expectedError }, idx) => {
    try {
        const result = dotCase(input);
        if (expectedError) {
            console.error(`dotCase Test ${idx + 1} FAILED: Expected error for input:`, input);
        } else if (result !== expected) {
            console.error(`dotCase Test ${idx + 1} FAILED: Input: "${input}" | Expected: "${expected}" | Got: "${result}"`);
        } else {
            console.log(`dotCase Test ${idx + 1} passed.`);
        }
    } catch (e) {
        if (expectedError) {
            console.log(`dotCase Test ${idx + 1} passed (caught expected error).`);
        } else {
            console.error(`dotCase Test ${idx + 1} FAILED: Unexpected error for input:`, input, e);
        }
    }
});

