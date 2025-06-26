/**
 * @author Anas Aboureada  [anas@aboureada.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Format Stringified JSON operation
 */
class FormatStringifiedJSON extends Operation {
    /**
     * FormatStringifiedJSON constructor
     */
    constructor() {
        super();

        this.name = "Format Stringified JSON";
        this.module = "Default";
        this.description = "Format Stringified nested JSON ";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "json";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {json}
     */
    run(input, args) {
        const result = {};

        if (!Utils.isJson(input)) {
            throw new Error("Can not parse json");
        }

        // eslint-disable-next-line prefer-const
        for (let [key, value] of Object.entries(JSON.parse(input))) {
            if (Utils.isJson(value)) {
                value = JSON.parse(value);
            }
            console.log(`${key}: ${value}`);
            result[key] = value;
        }

        return result;
    }

    /**
     * Highlight Format Stringified JSON
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight Format Stringified JSON in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }
}

export default FormatStringifiedJSON;
