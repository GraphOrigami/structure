# Like `Map`, but async

This library defines a collection of asynchronous key/value stores which share the same interface as the JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class, but the methods are asynchronous. For example, they have [get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) and [keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) methods that are `async` but otherwise work just like the corresponding methods in `Map`.

The library includes:

- TypeScript definitions for read-only and read/write stores
- Base classes `AsyncDictBase` and `AsyncStoreBase` that define derivable `Map` methods in terms of other methods. For example, `AsyncDictBase` provides a base implementation of [entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) in terms of `get` and `keys`, so that you create create new implementations of the read-only store interface with less work.
- `ObjectStore`: read/write store wrapping a plain JavaScript object
- `MapStore`: read/write store wrapping a (synchronous) JavaScript `Map`
- `FolderStore`: read/write store wrapping a file system folder using the Node [fs](https://nodejs.org/api/fs.html) API
- `FunctionStore`: read-only store wrapping a JavaScript function
