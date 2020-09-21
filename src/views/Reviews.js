import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Reviews extends Component {
  render() {
    const { reviews } = this.props;

    return (
      <>
        {reviews && (
          <>
            {reviews.results.length > 0 ? (
              <ul>
                {this.props.reviews.results.map((el) => (
                  <li key={el.id}>
                    <h2>{el.author}</h2>
                    <p>{el.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>We don't have any rewiews for this movie</p>
            )}
          </>
        )}
      </>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object),
    page: PropTypes.number,
    id: PropTypes.number,
    total_pages: PropTypes.number,
    total_results: PropTypes.number,
  }),
}.isRequired;
