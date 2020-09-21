import React, { Component, lazy, Suspense } from "react";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import tvAPI from "../services/tv-api";
import routes from "../routes";
import styles from "../index.module.css";
import detailStyles from "./ShowDetails.module.css";
import Spinner from "../components/Loader";
import Notification from "../components/Notification";
import PropTypes from "prop-types";

const Cast = lazy(() => import("./Cast" /* webpackChunkName: 'Cast' */));
const Reviews = lazy(() =>
  import("./Reviews" /* webpackChunkName: 'Reviews' */)
);

export default class ShowDetails extends Component {
  state = {
    show: null,
    credits: null,
    reviews: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    tvAPI
      .fetchShowDetails(this.props.match.params.movieId)
      .then((show) => this.setState({ show }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
    tvAPI
      .fetchShowCredits(this.props.match.params.movieId)
      .then((credits) => this.setState({ credits }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));

    tvAPI
      .fetchShowReviews(this.props.match.params.movieId)
      .then((reviews) => this.setState({ reviews }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  handleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }

    this.props.history.push(routes.movies);
  };

  render() {
    const { show, loading, error } = this.state;

    return (
      <>
        <button type="button" onClick={this.handleGoBack}>
          Go Back
        </button>
        <br />
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}

        {loading && <Spinner />}
        {this.state.show && (
          <>
            <section className={detailStyles.Description}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                  alt={show.title != null ? show.title : show.name}
                />
              </div>
              <div className={detailStyles.FilmDetails}>
                <h1>{show.title != null ? show.title : show.name}</h1>
                <p>User Score {show.vote_average * 10}%</p>
                <h2>Overview</h2>
                <p>{show.overview}</p>
                <h2>Genres</h2>
                <p>{show.genres.map((genre) => genre.name + " ")}</p>
              </div>
            </section>
            <hr />
            <p>Additional information</p>

            <ul>
              <li>
                <NavLink
                  className={styles.NavigationLink}
                  activeClassName={styles.NavigationLinkActive}
                  to={{
                    pathname: `${this.props.match.url}/cast`,
                    state: { from: this.props.location.state.from },
                  }}
                  exact
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={styles.NavigationLink}
                  activeClassName={styles.NavigationLinkActive}
                  to={{
                    pathname: `${this.props.match.url}/reviews`,
                    state: { from: this.props.location.state.from },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
            <hr />
            <Suspense fallback={<Spinner />}>
              <Route
                path={routes.cast}
                exact
                render={(props) => (
                  <Cast {...props} credits={this.state.credits} />
                )}
              />
              <Route
                path={routes.reviews}
                render={(props) => (
                  <Reviews {...props} reviews={this.state.reviews} />
                )}
              />
            </Suspense>
          </>
        )}
      </>
    );
  }
}

ShowDetails.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
