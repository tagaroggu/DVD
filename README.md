# DVD
Dumb Validator of Data. Only checks if shape of data is correct. Does not handle whether data itself is correct (whether a string is a date, email, etc.) nor does this handle transformations. Does not yet handle validating contents of an array.

## Example
```js
import { schema, validate } from 'dvd';

const requiredShape = {
    name: "string",
    // Unions are formed through arrays
    id: ["string", "number", "symbol"],
    // Nested objects are recursed through
    style: {
        hat: "string",
        glasses: "boolean"
    },
    atoms: "bigint",
    // Classes (typeof givenClass === "function") are checked with instanceof
    view: HTMLElement
    // Undefined allows optional fields
    accessories: ["array", "undefined"]
    // Functions/methods
    doAction: Function
}

const requiredShapeSchema = schema(requiredShape);

console.log(requiredShapeSchema(data)) // true or false
console.log(validate(requiredShape2, data)) // same as above
```

To do:
- Allow checking array contents. May require other changes.
- Maybe change to allow validator functions