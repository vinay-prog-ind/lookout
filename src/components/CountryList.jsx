import styles from "./CountryList.module.css";
/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCitiesContext } from "../context/CitiesContext";

export default function CountryList() {
  const { cities, loading } = useCitiesContext();
  if (loading) return <Spinner />;
  if (!cities.length) return <Message />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem key={i} countries={country} />
      ))}
    </ul>
  );
}
