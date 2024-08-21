import styles from "./CountryItem.module.css";

function CountryItem({ countries }) {
  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };
  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
  const { country, emoji } = countries;
  return (
    <li className={styles.countryItem}>
      <span>{flagemojiToPNG(getFlagEmoji(emoji))}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
