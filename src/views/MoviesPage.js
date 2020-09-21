import React, { Component } from "react";
import { Link } from "react-router-dom";
import getQueryParams from "../utils/get-query-params";
import Searchbox from "../components/Searchbox/Searchbox";
import tvAPI from "../services/tv-api";
import Spinner from "../components/Loader";
import Notification from "../components/Notification";
import PropTypes from "prop-types";

export default class Shows extends Component {
  state = {
    shows: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);

    if (query) {
      this.setState({ loading: true });
      this.fetchShows(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.setState({ loading: true });
      this.fetchShows(nextQuery);
    }
  }

  fetchShows = (query) => {
    tvAPI
      .fetchShowWithQuery(query)
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
        <Searchbox onSubmit={this.handleChangeQuery} />

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
                    pathname: `${match.url}/${show.id}`,
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

Shows.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
