const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
// import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useURLPosition } from "../hooks/useURLPosition";
import Spinner from "./Spinner";
import Message from "./Message";

import DatePicker from "react-datepicker";
import { useCitiesContext } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [emoji, setEmoji] = useState("");
	const [notes, setNotes] = useState("");

	const [lat, lng] = useURLPosition();
	const [isGeoLoading, setIsGeoLoading] = useState(false);
	const [geoCodingError, setGeoCodingError] = useState(" ");
	const { createCity, loading } = useCitiesContext();
	const Navigate = useNavigate();
	// const flagemojiToPNG = (flag) => {
	//   var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
	//     .map((char) => String.fromCharCode(char - 127397).toLowerCase())
	//     .join("");
	//   return (
	//     <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
	//   );
	// };
	async function handleSubmit(e) {
		e.preventDefault();
		if (!cityName || !date) return;
		const newCity = {
			cityName,
			country,
			date,
			emoji,
			notes,
			position: { lat, lng },
		};
		await createCity(newCity);
		Navigate("/app/cities");
	}
	useEffect(
		function () {
			if (!lat || !lng) return;
			async function fetchCityData() {
				try {
					setIsGeoLoading(true);
					setGeoCodingError("");
					// const res = await fetch(
					//   "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
					// );
					const res = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`
					);
					const data = await res.json();
					// return data;
					if (!data.countryCode) {
						throw new Error(
							"That Does't seem like a place, Please click somewhere else "
						);
					}
					setCityName(data.city || data.locality);
					setCountry(data.countryName);
					setEmoji(data.countryCode);
				} catch (err) {
					setGeoCodingError(err.message);
				} finally {
					setIsGeoLoading(false);
				}
			}
			fetchCityData();
		},
		[lat, lng]
	);

	if (!lat || !lng)
		return (
			<Message
				message={`Start With Clicking on the map`}
				emoji={"🗺️"}
			/>
		);

	if (geoCodingError)
		return <Message message={geoCodingError} emoji={"☝️🤓"} />;

	return (
		// <Link></Link>
		<form
			className={`${styles.form} ${
				loading ? styles.loading : " "
			}`}
			onSubmit={handleSubmit}
		>
			{isGeoLoading ? (
				<Spinner />
			) : (
				<>
					<div className={styles.row}>
						<label htmlFor="cityName">
							City name
						</label>
						<input
							id="cityName"
							onChange={(e) =>
								setCityName(
									e.target
										.value
								)
							}
							value={cityName}
						/>
						{/* <span className={styles.flag}>{emoji}</span> */}
					</div>

					<div className={styles.row}>
						<label htmlFor="date">
							When did you go to{" "}
							{cityName}?
						</label>
						{/* <input
              id="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            /> */}
						<DatePicker
							onChange={(date) =>
								setDate(date)
							}
							selected={date}
							dateFormat="dd/MM/yyy"
						/>
					</div>

					<div className={styles.row}>
						<label htmlFor="notes">
							Notes about your trip to{" "}
							{cityName}
						</label>
						<textarea
							id="notes"
							// onChange={(e) => setNotes(e.target.value)}
							// value={currentSelectedPosition}
						/>
					</div>

					<div className={styles.buttons}>
						{/* <button>Add</button>
        <button>&larr; Back</button> */}
						<Button type="primary">
							Add
						</Button>
						<BackButton />
					</div>
				</>
			)}
		</form>
	);
}

export default Form;
