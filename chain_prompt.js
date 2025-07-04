/**
 * Converts a given string to kebab-case format.
 * Handles camelCase, PascalCase, snake_case, space-separated, mixed separators,
 * consecutive capitals, numbers, special characters, and Unicode.
 *
 * @param {string} input - The string to convert.
 * @returns {string} The kebab-case formatted string.
 * @throws {TypeError} If input is not a string.
 */
function toKebabCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    if (input.trim() === '') {
        return '';
    }

    // Normalize separators to spaces
    let str = input
        .replace(/[_\-\s]+/g, ' ')
        // Insert space before any uppercase letter that follows a lowercase letter or number
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        // Insert space between consecutive capitals and next lowercase (XMLHttp → XML Http)
        .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1 $2')
        // Insert space between letters and numbers
        .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
        .replace(/([0-9])([a-zA-Z])/g, '$1 $2');

    // Remove special characters except Unicode letters, numbers, and spaces
    str = str.replace(/[^\p{L}\p{N}\s]+/gu, '');

    // Split, filter empty, join with hyphens, lowercase
    return str
        .split(/\s+/u)
        .filter(Boolean)
        .join('-')
        .toLowerCase();
}

// --- Test Cases ---
const tests = [
    // Step 1
    { input: 'helloWorld', expected: 'hello-world' },
    { input: 'MyComponentName', expected: 'my-component-name' },
    // Step 2
    { input: 'hello world', expected: 'hello-world' },
    { input: 'user_name_field', expected: 'user-name-field' },
    { input: 'My-Component Name', expected: 'my-component-name' },
    // Step 3
    { input: 'XMLHttpRequest', expected: 'xml-http-request' },
    { input: 'item123Name', expected: 'item123-name' },
    { input: 'special@#Chars!', expected: 'special-chars' },
    { input: 'ПриветМир', expected: 'привет-мир' }, // Unicode Cyrillic
    { input: '', expected: '' },
    { input: '  ', expected: '' },
    { input: 'FOOBar', expected: 'foo-bar' },
    { input: 'userIDNumber', expected: 'user-id-number' },
];

for (const { input, expected } of tests) {
    let result;
    try {
        result = toKebabCase(input);
        console.assert(
            result === expected,
            `Test failed: "${input}" → "${result}" (expected "${expected}")`
        );
    } catch (e) {
        console.error(`Error for input "${input}":`, e.message);
    }
}

// Test non-string input error
try {
    toKebabCase(null);
} catch (e) {
    console.assert(
        e instanceof TypeError,
        'Expected TypeError for non-string input'
    );
}
