const BASE_URL = "https://get.scrapehero.com";
const API_KEY = "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";

const getNewsFeeds = ({
  query = "",
  sentiment = "",
  start_date = "",
  end_date = "",
  source = "",
  category = "",
}) => {
  let url = `${BASE_URL}/news-api/news/?q=${query}&sentiment=${sentiment}&start_date=${start_date}&end_date=${end_date}&x-api-key=${API_KEY}`;

  if (source) {
    url = url.concat(`&source_id=${source}`);
  }

  if (category) {
    url = url.concat(`&category_id=${category}`);
    // console.log(category,url );
  }

  return fetch(url).then((res) => res.json());
};

const getCategories = () => {
  const url = `${BASE_URL}/news-api/categories/?x-api-key=${API_KEY}`;
  return fetch(url).then((res) => res.json());
};

const getSources = () => {
  const url = `${BASE_URL}/news-api/sources/?x-api-key=${API_KEY}`;
  return fetch(url).then((res) => res.json());
};

export { getNewsFeeds, getSources, getCategories };
