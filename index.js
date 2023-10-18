/**
 * Validates the data against the given shape. Currently breaks upon circular references.
 * @param {any} shape 
 * @param {unknown} data 
 * @returns {boolean}
 */
function validate(shape, data) {
    switch (typeof shape) {
        case "object":
            if (Array.isArray(shape)) {
                return shape.some(unionPiece => validate(unionPiece, data))
            }
            else {
                return typeof data === "object" &&
                    Object.keys(shape).every(key => validate(shape[key], data[key]))
            }
            // This ^ will break with a circular reference.
            break;
        case "string": // typeof values
            return typeof data === shape;
            break;
        case "function": // Class instance
            // TODO: Maybe changa how this works to validator functions? Would add a few more exports
            // But would make better functionality
            return data instanceof shape;
            break;
        case "symbol":
            return shape === data;
            break;
        case "undefined": // Allows optional pieces
            return data === undefined;
            break;
        case "bigint":
        case "boolean":
        case "number":
            throw new Error('Unsupported shape');
            break;  
    }
}

const schema = shape => data => validate(shape, data);

export { validate, schema }