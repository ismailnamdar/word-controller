# Word Controller
Lightweight javascript library to control minimum word count in one line. Only supported on web.

Demo: https://ismailnamdar.netlify.app/word-controller

# Example Usage

```js
const container = document.getElementById("container");
const text = "Lorem ipsum dolar amet lorem ipsum dolar.";

new WordController(container, text, { minWordCountInLine: 2, resizeObserver: true });
```
