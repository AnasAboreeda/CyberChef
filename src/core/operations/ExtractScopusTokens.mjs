import Operation from "../Operation.mjs";

/**
 * Extract Scopus Tokens operation
 */
class ExtractScopusTokens extends Operation {
    /**
     *
     */
    constructor() {
        super();
        this.name = "Extract Scopus JWT and Key";
        this.module = "Custom";
        this.description = "Extracts SCOPUS_JWT and scopus_key values from a cURL string and returns them as JSON";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const jwtMatch = input.match(/SCOPUS_JWT=([^;]+)/);
        const keyMatch = input.match(/scopus_key=([^;]+)/);


        const result = {
            scopusJWT: jwtMatch ? jwtMatch[1] : null,
            scopusKey: keyMatch ? keyMatch[1] : null
        };

        return JSON.stringify(result, null, 4);
    }

    /**
     *
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     *
     */
    highlightReverse(pos, args) {
        return pos;
    }
}

export default ExtractScopusTokens;
