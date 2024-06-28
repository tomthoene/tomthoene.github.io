document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select a CSV file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const contents = e.target.result;
        const data = parseCSV(contents);
        console.log('Parsed CSV data:', data); // Log parsed CSV data
        generateWordClouds(data);
    };
    reader.readAsText(file);
}

function parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const rows = lines.slice(1).map(line => line.split(',').map(cell => cell.trim()));
    return { headers, rows };
}

function generateWordClouds(data) {
    const canvasContainer = document.getElementById('wordCloudContainer');
    canvasContainer.innerHTML = ''; // Clear previous word clouds

    data.headers.forEach((header, index) => {
        // Create and append header element
        const headerElement = document.createElement('h2');
        headerElement.textContent = header;
        canvasContainer.appendChild(headerElement);

        // Create and append canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 2000; // Adjust canvas dimensions as needed
        canvas.height = 2000;
        canvas.className = 'word-cloud-canvas';
        canvas.id = `wordCloud${index}`;
        canvasContainer.appendChild(canvas);

        // Add click event listener to download the canvas as an image
        canvas.addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `${header}.png`;
            link.click();
        });

        const wordMap = new Map(); // Map to store word frequencies

        // Count frequencies of each word in the column
        data.rows.forEach(row => {
            if (row[index]) { // Check if the column exists
                const word = row[index].trim(); // Trim whitespace if the column exists
                if (word !== '') { // Check for non-empty values
                    if (wordMap.has(word)) {
                        wordMap.set(word, wordMap.get(word) + 1); // Increment frequency
                    } else {
                        wordMap.set(word, 1); // Initialize frequency
                    }
                }
            }
        });

        // Find the maximum frequency
        const maxFrequency = Math.max(...wordMap.values());

        // Convert frequencies to normalized weights
        const wordList = Array.from(wordMap.entries())
            .map(([word, frequency]) => {
                const percentage = (frequency / maxFrequency) * 100;
                const weight = Math.round((percentage / 100) * 8);
                return [word, weight];
            })
            .sort((a, b) => b[1] - a[1]); // Sort by weight descending

        console.log(`Word list for ${header}:`, wordList); // Log word list for each header
        generateWordCloud(canvas, wordList);
    });
}

function generateWordCloud(canvas, wordList) {
    WordCloud(canvas, {
        list: wordList,
        gridSize: Math.round(16 * canvas.width / 1024),
        weightFactor: function(size) {
            return size * 40; // Adjust weightFactor as needed
        },
        fontFamily: 'Arial',
        color: '#000000',
        backgroundColor: '#ffffff',
        rotateRatio: 0,
        minRotation: 0,
        maxRotation: Math.PI / 2,
        shuffle: true,
        shape: 'circle',
        ellipticity: 0.65,
        drawOutOfBound: false
    });
}