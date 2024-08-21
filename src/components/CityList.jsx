/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCitiesContext } from "../context/CitiesContext";

export default function CityList() {
  const { cities, loading } = useCitiesContext();
  if (loading) return <Spinner />;
  if (!cities.length) return <Message />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city, i) => (
        <CityItem key={i} city={city} />
      ))}
    </ul>
  );
}
