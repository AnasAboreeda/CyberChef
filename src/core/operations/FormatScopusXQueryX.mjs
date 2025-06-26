import xmlFormatter from "xml-formatter";

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Format Stringified JSON operation
 */
class FormatScopusXQueryX extends Operation {
  /**
   * FormatStringifiedJSON constructor
   */
    constructor() {
        super();

        this.name = "Format Scopus XQueryX";
        this.module = "Default";
        this.description = "Format Scopus XQueryX";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string"; // Change output type to string
        this.args = [];
    }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string} // Change return type to string
   */
    run(input, args) {
        let results = "";

        if (!Utils.isJson(input)) {
            throw new Error("Input is not a valid JSON string");
        }

        const data = JSON.parse(input);

    // Convert xqueryx and elsFilter to prettified XML strings
        if (data.xqueryx) {
            results += this.prettifyXml(data.xqueryx);
        }

        if (data.elsFilter) {
            results += "\n\n\n--- ELS Filter ---\n\n\n";
            results += this.prettifyXml(data.elsFilter);
        }

    // Convert the entire object to JSON string
        return results;
    }

  /**
   * Prettify XML string
   *
   * @param {string} xmlString
   * @returns {string}
   */
    prettifyXml(xmlString) {
        return xmlFormatter(xmlString, {
            indentation: "    ",
            lineSeparator: "\n",
        });
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

export default FormatScopusXQueryX;
