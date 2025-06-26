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
        this.description = "Extracts SCOPUS_JWT and scopus_key values from a cURL string and decodes the JWT. Note: scopus_new_jwt requires an external API and is not decoded here.";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * Base64url decode (without padding)
     * @param {string} str
     */
    base64urlDecode(str) {
        try {
            const base64 = str
                .replace(/-/g, "+")
                .replace(/_/g, "/")
                .padEnd(str.length + (4 - str.length % 4) % 4, "=");
            const json = atob(base64);
            return JSON.parse(json);
        } catch (e) {
            return { error: "Invalid base64 or malformed JSON" };
        }
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const jwtMatch = input.match(/SCOPUS_JWT=([^;]+)/);
        const keyMatch = input.match(/scopus_key=([^;]+)/);

        const scopusJWT = jwtMatch ? jwtMatch[1] : null;
        const scopusKey = keyMatch ? keyMatch[1] : null;

        let scopusJWTDecoded = null;
        if (scopusJWT) {
            const parts = scopusJWT.split(".");
            if (parts.length >= 2) {
                scopusJWTDecoded = {
                    header: this.base64urlDecode(parts[0]),
                    payload: this.base64urlDecode(parts[1])
                };
            } else {
                scopusJWTDecoded = { error: "Invalid JWT format" };
            }
        }

        const result = {
            scopusJwt: scopusJWT,
            scopusJwtDecoded: scopusJWTDecoded,
            scopusKey: scopusKey,
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
