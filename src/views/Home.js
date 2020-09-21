import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Loader";
import Notification from "../components/Notification";
import tvAPI from "../services/tv-api";
import PropTypes from "prop-types";

export default class Home extends Component {
  state = {
    shows: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchTrending();
  }

  fetchTrending = () => {
    tvAPI
      .fetchShowTrending()
      .then((shows) => this.setState({ shows }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleChangeQuery = (query) => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { shows, loading, error } = this.state;
    const { match } = this.props;

    return (
      <>
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}

        {loading && <Spinner />}

        {shows.length > 0 && (
          <ul>
            {shows.map((show) => (
              <li key={show.id}>
                <Link
                  to={{
                    pathname: `${match.url}movies/${show.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {show.title != null ? show.title : show.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
