// import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavInshort from "./components/NavInshort";
import NewsContent from "./components/NewsContent/NewsContent";
import apikey from "./data/config";

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);
  const [category, setCategory] = useState("general");

  const newsApi = async () => {
    // const news = await axios.get(``);

    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    const url = `${proxyUrl}https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}&pageSize=${loadMore}&category=${category}`;
    const request = new Request(url);

    fetch(request)
      .then((response) => response.json())
      .then((news) => {
        console.log(news);
        setNewsArray(news.articles);
        setNewsResults(news.totalResults);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    newsApi();
    // eslint-disable-next-line
  }, [newsResults, loadMore, category]);

  return (
    <div className="App" id="#home">
      <NavInshort setCategory={setCategory} />
      {newsResults && (
        <NewsContent
          newsArray={newsArray}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
