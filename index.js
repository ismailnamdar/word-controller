function createEmpty(rect, whiteSpaceWidth) {
	const { width, height } = rect;
	const span = document.createElement('span');
	span.setAttribute('data-word-id', 'empty');
	span.style.marginLeft = whiteSpaceWidth;
	span.style.width = `${width}px`;
	span.style.height = `${height}px`;
	return span;
}

function WordController(container, text, config) {
	this._config = config ?? {};
	const { minWordCountInLine = 2, resizeObserver = true, deliminator = ' ', whiteSpaceWidth = '4px' } = this._config;

	function renderText() {
		console.log('rendered');
		// Remove children if there is any
		container.innerHTML = '';
		// Add required styles
		container.style.display = 'flex';
		container.style.flexWrap = 'wrap';

		const lineConfig = [
			// {
			// y: '',
			// words: [],
			// }
		];
		text.split(deliminator).forEach((word, index) => {
			const span = document.createElement('span');
			span.style.marginLeft = whiteSpaceWidth;
			span.setAttribute('data-word-index', String(index));
			span.innerText = word;

			container.appendChild(span);
			const { y } = span.getBoundingClientRect();
			const lastLine = lineConfig[lineConfig.length - 1];

			// new line
			if (lastLine == null || lastLine.y !== y) {
				lineConfig.push({
					y,
					words: [span]
				});
			} else {
				lastLine.words.push(span);
			}

			return span;
		});

		lineConfig.forEach((line, index) => {
			if (line.words.length < minWordCountInLine) {
				// look for previous line
				if (index !== 0) {
					const lineWordCount = line.words.length;
					for (let i = 0; i < (minWordCountInLine - lineWordCount); i++) {
						if (lineConfig[index - 1].words.length > minWordCountInLine) {
							const lastWordOfPrevLine = lineConfig[index - 1].words.pop();

							// Append empty span to actual word's place
							const nextElement = lastWordOfPrevLine.nextElementSibling;
							const rect = lastWordOfPrevLine.getBoundingClientRect();
							const emptyElement = createEmpty(rect, whiteSpaceWidth);
							container.insertBefore(emptyElement, nextElement);
							// Remove the actual word element
							lastWordOfPrevLine.parentElement.removeChild(lastWordOfPrevLine);
							container.insertBefore(lastWordOfPrevLine, line.words[0]);
							// update the state
							line.words = [lastWordOfPrevLine, ...line.words];
						}
					}
				}
			}
		});
	}

	renderText();
	// Adjust text on resize
	if (resizeObserver && typeof ResizeObserver !== "undefined") {
		new ResizeObserver(renderText).observe(container)
	}

	return {
		renderText,
	}
}

export default WordController;
