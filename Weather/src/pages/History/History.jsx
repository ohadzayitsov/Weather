import { useContext, useEffect } from "react";
import styles from "./History.module.css";
import { SearchContext } from "../../utils/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHeartCircleXmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const History = () => {
  const { lastSearches, updateLastSearches } = useContext(SearchContext);
  const { selectedSearch, updateSelectedSearch, removeSearch } =
    useContext(SearchContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (lastSearches.length === 0) {
      navigate("/home");
    }
  }, [lastSearches]);

  const onDelete = (index) => {
    removeSearch(index);
  };
  const isSearchSelected = (index) => {
    return lastSearches[index].city === selectedSearch.city;
  };
  const onFavorite = (index) => {

  };

  const onUnfavorite = (index) => {
    
  };
  return (
    <div className={styles.body}>
      {lastSearches.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>עיר</th>
              <th>מדינה</th>
              <th>יבשת</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {lastSearches.map((search, index) => (
              <tr key={index}>
                <td>{search.city}</td>
                <td>{search.country}</td>
                <td>{search.continent}</td>
                <td>
                  {isSearchSelected(index) ? (
                    <button
                      className={styles.unfavoriteBtn}
                      onClick={() => onUnfavorite(index)}
                    >
                      <FontAwesomeIcon icon={faHeartCircleXmark} />
                    </button>
                  ) : (
                    <button
                      className={styles.favoriteBtn}
                      onClick={() => onFavorite(index)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  )}
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default History;
