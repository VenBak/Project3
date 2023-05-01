import axios from "axios";
const apiKey = "LHNP7GIVVTG71SJ6";

const searchSymbol = async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`;
    const { data } = await axios.get(url);
    return data;
}

const searchSymbolDuration = async (symbol, duration) => {
    switch (duration) {
        case "1m":
            var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=${apiKey}`;
            var interval = "Time Series (1min)";
            break;
        case "1d":
            var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;
            var interval = "Time Series (Daily)";
            break;
        case "1wk":
            var url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`
            var interval = "Weekly Time Series";
            break;
        case "1mo":
            var url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;
            var interval = "Monthly Time Series";
            break;
        default:
            var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;
            var interval = "Time Series (Daily)";
    }
    const { data } = await axios.get(url);
    var chartTimes = Object.keys(data[interval]);
    chartTimes = chartTimes.slice(0, 100);
    chartTimes = chartTimes.reverse();

    var chartData = chartTimes.map((time) => parseFloat(data[interval][time]["4. close"]));
    let dataPackage = [];
    dataPackage.push(chartTimes);
    dataPackage.push(chartData);

    return dataPackage;
}

export { searchSymbol, searchSymbolDuration };
