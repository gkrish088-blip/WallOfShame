import { useState, useEffect } from "react";
import { getMoreData } from "../api/index.js";

const UseSnippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [totalFetchedSoFar, settotalFetchedSoFar] = useState(0);

  const fetchPageSnippets = async (pageNum) => {
    try {
      console.log(pageNum);
      setloading(true);
      const data = await getMoreData(pageNum);

      if (pageNum === 1) {
        setSnippets(data.users);
        console.log(snippets, "useSNippets.js");
      } else {
        setSnippets((prev) => [...prev, ...data.users]);
      }
      const newTotal = totalFetchedSoFar + data.users.length;

      settotalFetchedSoFar(newTotal);
      console.log("totalFetchedSOFar", newTotal);

      const newHasMore = newTotal < data.total;
      setHasMore(newHasMore);

      console.log(newHasMore, data.total);
    } catch (error) {
      setError("Failed to fetch snippets");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchPageSnippets(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    // console.log("current-page" , page , nextPage)
    fetchPageSnippets(nextPage);
  };

  const refresh = () => {
    setPage(1);
    fetchPageSnippets(1);
  };

  return { snippets, loading, error, hasMore, loadMore, refresh };
};

export default UseSnippets;
