# DVD
Dumb Validator of Data.

## Example
```js
import DVD from 'dvd';

const schema = DVD.object({
    name: DVD.string(),
    id: DVD.string(),
    timestamp: DVD.number(n => n >= 0),
    handedness: DVD.union([DVD.literal('left'), DVD.literal('right')])
})

```
