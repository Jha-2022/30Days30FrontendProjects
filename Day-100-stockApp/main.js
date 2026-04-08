const API_KEY = '13KkfiJ9tqP7Wsm1mgR9lz7PoxVNUHT7';

async function fetchStockData() {
    const ticker = document.getElementById('tickerInput').value.toUpperCase();
    const displayBoard = document.getElementById('displayBoard');
    
    if (!ticker) return alert("Please enter a ticker");

    // Using the Prev Day endpoint for a reliable simple test
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.resultsCount > 0) {
            const result = data.results[0];
            
            displayBoard.style.display = 'block';
            document.getElementById('symbol').innerText = data.ticker;
            document.getElementById('price').innerText = `$${result.c}`; // 'c' is close price
            
            const change = result.c - result.o; // close minus open
            document.getElementById('change').innerText = `Daily Change: ${change.toFixed(2)}`;
            document.getElementById('change').style.color = change >= 0 ? '#00ff88' : '#ff4444';
        } else {
            alert("Ticker not found.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Check console.");
    }
}
