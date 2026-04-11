const API_KEY = 'YOUR_API_KEY_HERE';

// Top 5 US companies (you can change these)
const tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];

async function fetchStockData() {
    const displayBoard = document.getElementById('displayBoard');
    displayBoard.innerHTML = ""; // clear previous data
    displayBoard.style.display = 'flex';
    displayBoard.style.gap = '20px';

    for (let ticker of tickers) {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.resultsCount > 0) {
                const result = data.results[0];

                const change = result.c - result.o;

                // Create card for each stock
                const stockCard = document.createElement('div');
                stockCard.style.border = "1px solid #ccc";
                stockCard.style.padding = "15px";
                stockCard.style.borderRadius = "10px";
                stockCard.style.width = "150px";
                stockCard.style.textAlign = "center";

                stockCard.innerHTML = `
                    <h3>${data.ticker}</h3>
                    <p>Price: $${result.c}</p>
                    <p style="color:${change >= 0 ? '#00ff88' : '#ff4444'}">
                        Change: ${change.toFixed(2)}
                    </p>
                `;

                displayBoard.appendChild(stockCard);
            }

        } catch (error) {
            console.error(`Error fetching ${ticker}:`, error);
        }
    }
}
