import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Cast extends Component {
  render() {
    const { credits } = this.props;

    return (
      <>
        {credits && (
          <>
            {credits.cast.length > 0 && (
              <ul>
                {credits.cast.map((el) => (
                  <li key={el.id}>
                    <img
                      src={
                        el.profile_path
                          ? `https://image.tmdb.org/t/p/w200${el.profile_path}`
                          : ""
                      }
                      alt={el.name}
                    />
                    <p>{el.name}</p>
                    <p>Character: {el.character}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </>
    );
  }
}

Cast.propTypes = {
  credits: PropTypes.shape({
    cast: PropTypes.arrayOf(PropTypes.object),
    crew: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
  }),
}.isRequired;
