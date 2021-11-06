(function () {
  'use strict';

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function createEmpty(rect, whiteSpaceWidth) {
    var width = rect.width,
        height = rect.height;
    var span = document.createElement('span');
    span.setAttribute('data-word-id', 'empty');
    span.style.marginLeft = whiteSpaceWidth;
    span.style.width = "".concat(width, "px");
    span.style.height = "".concat(height, "px");
    return span;
  }

  function WordController(container, text, config) {
    this._config = config !== null && config !== void 0 ? config : {};
    var _this$_config = this._config,
        _this$_config$minWord = _this$_config.minWordCountInLine,
        minWordCountInLine = _this$_config$minWord === void 0 ? 2 : _this$_config$minWord,
        _this$_config$resizeO = _this$_config.resizeObserver,
        resizeObserver = _this$_config$resizeO === void 0 ? true : _this$_config$resizeO,
        _this$_config$delimin = _this$_config.deliminator,
        deliminator = _this$_config$delimin === void 0 ? ' ' : _this$_config$delimin,
        _this$_config$whiteSp = _this$_config.whiteSpaceWidth,
        whiteSpaceWidth = _this$_config$whiteSp === void 0 ? '4px' : _this$_config$whiteSp;

    function renderText() {
      console.log('rendered'); // Remove children if there is any

      container.innerHTML = '';
      var lineConfig = [// {
        // y: '',
        // words: [],
        // }
      ];
      text.split(deliminator).forEach(function (word, index) {
        var span = document.createElement('span');
        span.style.marginLeft = whiteSpaceWidth;
        span.setAttribute('data-word-index', String(index));
        span.innerText = word;
        container.appendChild(span);

        var _span$getBoundingClie = span.getBoundingClientRect(),
            y = _span$getBoundingClie.y;

        var lastLine = lineConfig[lineConfig.length - 1]; // new line

        if (lastLine == null || lastLine.y !== y) {
          lineConfig.push({
            y: y,
            words: [span]
          });
        } else {
          lastLine.words.push(span);
        }

        return span;
      });
      lineConfig.forEach(function (line, index) {
        if (line.words.length < minWordCountInLine) {
          // look for previous line
          if (index !== 0) {
            var lineWordCount = line.words.length;

            for (var i = 0; i < minWordCountInLine - lineWordCount; i++) {
              if (lineConfig[index - 1].words.length > minWordCountInLine) {
                var lastWordOfPrevLine = lineConfig[index - 1].words.pop(); // Append empty span to actual word's place

                var nextElement = lastWordOfPrevLine.nextElementSibling;
                var rect = lastWordOfPrevLine.getBoundingClientRect();
                var emptyElement = createEmpty(rect, whiteSpaceWidth);
                container.insertBefore(emptyElement, nextElement); // Remove the actual word element

                lastWordOfPrevLine.parentElement.removeChild(lastWordOfPrevLine);
                container.insertBefore(lastWordOfPrevLine, line.words[0]); // update the state

                line.words = [lastWordOfPrevLine].concat(_toConsumableArray(line.words));
              }
            }
          }
        }
      });
    }

    renderText(); // Adjust text on resize

    if (resizeObserver && typeof ResizeObserver !== "undefined") {
      new ResizeObserver(renderText).observe(container);
    }

    return {
      renderText: renderText
    };
  }

  return WordController;

})();
