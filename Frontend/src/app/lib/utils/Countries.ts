import countries from "./../../../data/countries.json";

export const COUNTRY_ITEMS = Object.entries(countries).map(([code, name]) => ({
  text: name,
  value: code,
}));
