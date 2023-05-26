This library defines a collection of asynchronous key/value stores which are:

a) like the JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class
b) but asynchronous

For instance, an async store has methods like the [get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) and [keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) defined by `Map`, but these methods are `async` instead of synchronous.

The library includes:

- TypeScript definitions for read-only and read/write stores.
- Base classes `ReadStore` and `WriteStore` that define some of the `Map` methods in terms of other methods. For example, [entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) is defined in terms of `get` and `keys`.
- Read/write stores that wrap a plain JavaScript object or `Map`
- Read/write store that wraps a file system folder using the Node [fs](https://nodejs.org/api/fs.html) API
- Read-only stores based on a JavaScript function
