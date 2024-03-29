import Footer from "./components/Footer";
import videoLights from "./assets/pixels-flying.mp4";
import Main from "./components/Main";
import { useState } from "react";
import { useEffect } from "react";
import "./styles.css";
import axios from "axios";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const quoteApi = async () => {
    let arrayOfQuotes = [];
    try {
      const data = await axios.get("https://api.quotable.io/random");
      arrayOfQuotes = data.data;
      console.log(arrayOfQuotes);
    } catch (error) {
      console.log(error);
    }
    try {
      setQuote(arrayOfQuotes.content);
      setAuthor(arrayOfQuotes.author);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    quoteApi();
    setIsLoading(false);
  }, []);

  return (
    <section className="page">
      {/* <div>
        <Main />
      </div> */}
      <div>
        <video src={videoLights} autoPlay loop muted />
        <h1>Quote Generator</h1>
        <div className="container">
          {isLoading ? (
            <p className="loading">Quote now loading...</p>
          ) : (
            <div className="quote-container">
              <div className="quote">
                <blockquote>{quote}</blockquote>
              </div>
              <div className="author">
                <blockquote>{author}</blockquote>
              </div>
              {/* <button onClick={quoteApi}>Generate!</button> */}
            </div>
          )}
          <Footer />
        </div>
        <button onClick={quoteApi}>Generate!</button>
      </div>
    </section>
  );
};
export default App;
