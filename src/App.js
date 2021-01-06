import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavInshort from "./components/NavInshort";
import NewsContent from "./components/NewsContent/NewsContent";

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);
  const [category, setCategory] = useState("general");

  const newsApi = async () => {
    const news = await axios.get(
      `http://newsapi.org/v2/top-headlines?country=in&apiKey=3bea0ded0d3b4319922a2b1d6a934aa0&pageSize=${loadMore}&category=${category}`
    );
    console.log(news.data);
    setNewsArray(news.data.articles);
    setNewsResults(news.data.totalResults);
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
