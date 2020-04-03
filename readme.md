# mdast

this package wraps the mdast parse and stringify functions from _remark_

examples:

```js
const mdast = require("@karuga/mdast");

const input = "go to [https://google.com](https://google.com)";

// parsing
const parsed = mdast.parse(input);

// transforming
const root = parsed.children[0];
root.children[0].value = "navigate to ";
root.children[1].children[0].value = "google";

// stringifying
const result = mdast.stringify(parsed);

console.log(result);
// navigate to [google](https://google.com)
```
