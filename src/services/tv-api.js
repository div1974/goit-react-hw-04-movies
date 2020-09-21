const baseURL = "https://api.themoviedb.org";
const myKey = "fef6e93fa592f49882518b3e2b3b59f9";

const fetchShowDetails = (showId) => {
  return fetch(
    `${baseURL}/3/movie/${showId}?api_key=${myKey}&language=en-US`
  ).then((res) => res.json());
};

const fetchShowWithQuery = (searchQuery) => {
  return fetch(
    `${baseURL}/3/search/movie?api_key=${myKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
  )
    .then((res) => res.json())
    .then((entries) => entries.results.map((entry) => entry));
};
const fetchShowTrending = () => {
  return fetch(`${baseURL}/3/trending/movie/day?api_key=${myKey}`)
    .then((res) => res.json())
    .then((entries) => entries.results.map((entry) => entry));
};

const fetchShowCredits = (showId) => {
  return fetch(
    `${baseURL}/3/movie/${showId}/credits?api_key=${myKey}`
  ).then((res) => res.json());
};

const fetchShowReviews = (showId) => {
  return fetch(
    `${baseURL}/3/movie/${showId}/reviews?api_key=${myKey}&language=en-US&page=1`
  ).then((res) => res.json());
};

export default {
  fetchShowDetails,
  fetchShowWithQuery,
  fetchShowCredits,
  fetchShowReviews,
  fetchShowTrending,
};
