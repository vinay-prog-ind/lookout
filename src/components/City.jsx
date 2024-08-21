// import { useParams, useSearchParams } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useCitiesContext } from "../context/CitiesContext";
import { useEffect } from "react";
import styles from "./City.module.css";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, loading } = useCitiesContext();
  const { cityName, emoji, date, notes } = currentCity;
  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );
  // const flagemojiToPNG = (flag) => {
  //   var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
  //     .map((char) => String.fromCharCode(char - 127397).toLowerCase())
  //     .join("");
  //   return (
  //     <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  //   );
  // };
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  // const { cityName, emoji, date, notes } = currentCity;

  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  return (
    <div className={styles.city}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              {/* <span>{flagemojiToPNG(getFlagEmoji(emoji))}</span> {cityName} */}
              <span>{emoji}</span> {cityName}
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date || null)}</p>
          </div>

          {notes && (
            <div className={styles.row}>
              <h6>Your notes</h6>
              <p>{notes}</p>
            </div>
          )}

          <div className={styles.row}>
            <h6>Learn more</h6>
            <a
              href={`https://en.wikipedia.org/wiki/${cityName}`}
              target="_blank"
              rel="noreferrer"
            >
              Check out {cityName} on Wikipedia &rarr;
            </a>
          </div>

          <div>
            <BackButton />
          </div>
        </>
      )}
    </div>
  );
}

export default City;
