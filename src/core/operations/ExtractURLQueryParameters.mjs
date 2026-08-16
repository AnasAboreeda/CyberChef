/**
 * @author Anas Aboureada [anas@aboureada.com]
 * @copyright Crown Copyright 2026
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Extract URL Query Parameters operation
 */
class ExtractURLQueryParameters extends Operation {

    /**
     * ExtractURLQueryParameters constructor
     */
    constructor() {
        super();

        this.name = "Extract URL Query Parameters";
        this.module = "URL";
        this.description = "Extracts all query parameters from a URL (or a bare query string) and prints each one on its own line as <code>Key: value</code>, with the keys aligned for ease of reading.<br><br>Repeated keys are preserved and each occurrence is printed on a separate line.";
        this.infoURL = "https://wikipedia.org/wiki/Query_string";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Sort by key",
                type: "boolean",
                value: false
            },
            {
                name: "URL decode values",
                type: "boolean",
                value: true
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [sort, decode] = args;

        if (!input.trim()) {
            return "";
        }

        // Isolate the query string: take everything after the first "?" (and
        // before any "#" fragment). If there is no "?", treat the whole input
        // as a bare query string.
        let query = input;
        const qIndex = input.indexOf("?");
        if (qIndex !== -1) {
            query = input.slice(qIndex + 1);
        }
        const hashIndex = query.indexOf("#");
        if (hashIndex !== -1) {
            query = query.slice(0, hashIndex);
        }

        const params = [];
        for (const pair of query.split("&")) {
            if (!pair) continue;

            const eqIndex = pair.indexOf("=");
            let key, value;
            if (eqIndex === -1) {
                key = pair;
                value = "";
            } else {
                key = pair.slice(0, eqIndex);
                value = pair.slice(eqIndex + 1);
            }

            if (decode) {
                try {
                    key = decodeURIComponent(key.replace(/\+/g, " "));
                    value = decodeURIComponent(value.replace(/\+/g, " "));
                } catch (err) {
                    // Leave the raw value if it cannot be decoded
                }
            }

            params.push([key, value]);
        }

        if (!params.length) {
            return "";
        }

        if (sort) {
            params.sort((a, b) => a[0].localeCompare(b[0]));
        }

        let padding = 0;
        params.forEach(([key]) => {
            padding = (key.length > padding) ? key.length : padding;
        });

        return params
            .map(([key, value]) => `${key.padEnd(padding, " ")} : ${value}`)
            .join("\n");
    }

}

export default ExtractURLQueryParameters;
