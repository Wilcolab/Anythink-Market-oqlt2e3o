function makeCamelCase(text) {
    return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

// Example usage:
// console.log(makeCamelCase("camelcase")); // "camelcase"
// console.log(makeCamelCase("make camel case")); // "makeCamelCase"
