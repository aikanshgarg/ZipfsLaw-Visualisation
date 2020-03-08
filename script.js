// DOM elements
const myChart = document.getElementById('myChart').getContext('2d');
const userTextInput = document.getElementById('text-input');
const visualizeBtn = document.getElementById('visualize-btn');

const makeGraph = (wordArray, wordFrequencyArray) => {
	const zipfLawChart = new Chart(myChart, {
		type: 'line',
		data: {
			labels: wordArray, // X-axis => words
			datasets: [{
				label: 'Frequency',
				data: wordFrequencyArray, // Y-axis => frequency of words
				backgroundColor: '#eeff41',
				borderWidth: 1,
				borderColor: '#212121',
				hoverBorderWidth: 3,
				hoverBorderColor: '#000',
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Zipf\'s Law Visualisation',
				fontSize: 30
			},
			legend: {
				position: 'bottom',
				labels: {
					fontColor: '#000'
				}
			}
		}
	});
};

const sortWordCounts = (wordCounts) => {
	const sortable = [];
	for (const word in wordCounts) {
		sortable.push([word, wordCounts[word]]);
	}
	return sortable.sort((a, b) => b[1] - a[1]);
};

const curateData = (wordCounts) => {
	const sortedWordCounts = sortWordCounts(wordCounts);
	const wordArray = [];
	const wordFrequencyArray = [];
	for (let i = 0; i < sortedWordCounts.length; i++) {
		wordArray.push(sortedWordCounts[i][0]);
		wordFrequencyArray.push(sortedWordCounts[i][1]);
	}
	makeGraph(wordArray, wordFrequencyArray);
};

const parseData = () => {
	const string = userTextInput.value;
	const arrOfWords = string.split(/\s+/);

	const wordCounts = Object.create(null);
	for (let i = arrOfWords.length - 1; i >= 0; i--) {
		const word = arrOfWords[i];
		if (!wordCounts[word]) {
			wordCounts[word] = 1;
		} else {
			wordCounts[word]++;
		}
	}
	curateData(wordCounts);
};


const init = () => {
	if (userTextInput.value !== '') {
		parseData();
	}
};