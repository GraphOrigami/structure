# Like `Map`, but async

This project defines a collection of asynchronous key/value dictionaries which are inspired by the JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class, but the interfaces are:

- Asynchronous: they have [get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) and [keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) methods that are `async` but work much like the corresponding methods in `Map`.
- Minimalist: `Map` methods like [entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) and [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) can be defined in terms of `get` and `keys`, and hence are omitted.

The `async-dictionary` package includes TypeScript definitions for the core interfaces:

- `AsyncDictionary` for an asynchronous read-only key-value dictionary.
- `AsyncMutableDictionary` for an asynchronous read/write key-value dictionary.

The `core` package includes classes that wrap various structures as asynchronous dictionaries:

- `ObjectGraph`: wraps a plain JavaScript object
- `MapDictionary`: wraps a (synchronous) JavaScript `Map`
- `FolderGraph`: wraps a file system folder using the Node [fs](https://nodejs.org/api/fs.html) API
- `FunctionGraph`: wraps a JavaScript function
- The package also includes utility functions that define the derivable `Map` methods in terms of the dictionary interface methods. For example, an `entries` function works like the `Map` [entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) method.
