function App() {

  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState("");
  const [color, setColor] = React.useState("#fff"); // default color on the first loading of page

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      // set the data to our quotes
      setQuotes(data);

      // define a random index
      let randIndex = Math.floor(Math.random() * data.length);

      // get a random quote with random index in our quotes
      setRandomQuote(data[randIndex]);
    } 
    fetchData();
  }, []);

  const getNewQuote = () => {
    const colors = [
      '#16a085',
      '#27ae60',
      '#2c3e50',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#472E32',
      '#BDBB99',
      '#77B1A9',
      '#73A857'
    ];

    let randIndex = Math.floor(Math.random() * quotes.length);
    let randColorIndex = Math.floor(Math.random() * colors.length);
    setRandomQuote(quotes[randIndex]);
    setColor(colors[randColorIndex]);
  }

  return (
  <div style={{backgroundColor: color, minHeight: "100vh" }}>
    <div id="quote-box" className="container">
        <div className="card" id="text">
          <div className="card-header">Quote</div>
          <div className="card-body" >
            {randomQuote ? (
              <>
              <h3 className="card-text text-center">&quot;{randomQuote.text}&quot;</h3>
              <h5 className="card-title  text-center" id="author">-{randomQuote.author.split(",")[0] != "type.fit" ? randomQuote.author.split(",")[0] : "No-author"}</h5>
              
              </>
            ) : (
              <h2>Loading</h2>
            )}

            <div className="row">
              <div className="col-sm-6">
                <button id="new-quote" className="btn btn-primary float-end" onClick={getNewQuote}>New Quote</button>
              </div>
              <div className="col-sm-6">
                <a id="tweet-quote" href={"https://twitter.com/intent/tweet?hashtags=quotesapp&relate=freecodecamp&text=" + encodeURIComponent('"' + randomQuote.text + '" ' + randomQuote.author)}
              target="_blank" className="btn btn-warning float-right">
                  <i className="fa fa-x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
  
}

ReactDOM.render(<App/>, document.getElementById("app"));