import WordController from "../index";

const MIN_WORD_COUNT = 3;
const container = document.getElementById("container");
const containerNormal = document.getElementById("normal");
const text = "Lorem ipsum dolar amet lorem ipsum dolar.";

containerNormal.innerText = text;

const wordController = new WordController(container, text, { minWordCountInLine: MIN_WORD_COUNT, resizeObserver: true });
