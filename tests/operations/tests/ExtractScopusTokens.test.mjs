/**
 * Extract Scopus Tokens tests
 *
 * @author anas
 * @copyright Crown Copyright 2025
 * @license Apache-2.0
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Extracts SCOPUS_JWT and scopus_key correctly",
        input: `curl 'https://example.com' -b 'foo=bar; SCOPUS_JWT=abc.def.ghi; scopus_key=my-secret-key; another=cookie'`,
        expectedOutput: `{
    "scopus_jwt": "abc.def.ghi",
    "scopus_key": "my-secret-key"
}`,
        recipeConfig: [
            {
                op: "Extract Scopus JWT and Key",
                args: []
            }
        ]
    },
    {
        name: "Handles missing SCOPUS_JWT and scopus_key",
        input: `curl 'https://example.com' -b 'foo=bar; another=cookie'`,
        expectedOutput: `{
    "scopus_jwt": null,
    "scopus_key": null
}`,
        recipeConfig: [
            {
                op: "Extract Scopus JWT and Key",
                args: []
            }
        ]
    },
    {
        name: "Only SCOPUS_JWT present",
        input: `curl 'https://example.com' -b 'SCOPUS_JWT=eyJ.test.token'`,
        expectedOutput: `{
    "scopus_jwt": "eyJ.test.token",
    "scopus_key": null
}`,
        recipeConfig: [
            {
                op: "Extract Scopus JWT and Key",
                args: []
            }
        ]
    },
    {
        name: "Only scopus_key present",
        input: `curl 'https://example.com' -b 'scopus_key=some-key-1234'`,
        expectedOutput: `{
    "scopus_jwt": null,
    "scopus_key": "some-key-1234"
}`,
        recipeConfig: [
            {
                op: "Extract Scopus JWT and Key",
                args: []
            }
        ]
    }
]);
