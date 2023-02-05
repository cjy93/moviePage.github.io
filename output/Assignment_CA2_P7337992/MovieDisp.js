import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Card, Form } from 'react-bootstrap';
import { pin } from "./slices/pinSlice.js";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MovieDataService from "../services.js";
export default function MovieDisp(props) {
  const dispatch = useDispatch();
  let movies = props.movies;
  const pinned = useSelector(function (store) {
    return store.pin.value;
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, movies.map(function (movie, index) {
    const emoji = movie.imdb >= 5 ? '👍' : movie.imdb < 5 ? '👎' : '❓';
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Col, {
      md: "3"
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        width: '14rem'
      }
    }, /*#__PURE__*/React.createElement(Card.Img, {
      variant: "top",
      src: movie.Image_URL
    }), /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Card.Title, {
      className: "text-dark"
    }, /*#__PURE__*/React.createElement("a", {
      href: movie.links,
      target: "_blank"
    }, movie.name)), /*#__PURE__*/React.createElement(Card.Text, {
      className: "text-dark"
    }, "[Date Released: ", movie.Release_Date, "] (", emoji, movie.imdb, "%)", /*#__PURE__*/React.createElement(Link, {
      to: `/details/${movie['movieID']}`
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        // pass localStorage to "RootPage.jsx" as RootPage did not iterate across Index, so cannot receive data unless with localStorage
        localStorage['movieId'] = movie['movieID'];
      }
    }, "Details page! \uD83D\uDCD4")), "\xA0", /*#__PURE__*/React.createElement("button", {
      className: pinned.includes(parseInt(movie.movieID)) ? 'hide' : '' // hide pin button if it is pinned
      ,
      onClick: () => {
        dispatch(pin(movie));
      }
    }, "Pin \uD83D\uDCCC"), /*#__PURE__*/React.createElement("button", {
      variant: "primary",
      onClick: e => {
        MovieDataService.deleteMovie(movie.movieID).then(response => {
          if (response.data) {
            console.log("what is the delete response");
            console.log(response);
          }
        });
        props.onDelete(index);
      }
    }, "Delete \uD83D\uDDD1\uFE0F")), /*#__PURE__*/React.createElement(BoxClicked, {
      className: "text-dark",
      index: index,
      onChecked: e => {
        props.onChecked(e);
      }
    })))));
  }));
  function BoxClicked(props) {
    // If the checkbox is checked, changed "checked" to true.
    const [checked, setChecked] = React.useState(false);
    // If the checkbox is unchecked(after checked), register in a 
    return /*#__PURE__*/React.createElement("div", {
      className: "text-dark"
    }, /*#__PURE__*/React.createElement(Form.Check, {
      type: "checkbox",
      label: "Add to delete list ",
      className: "text-dark",
      defaultChecked: checked // checked={checked}
      ,
      onChange: () => {
        setChecked(!checked); // To change the existing checked status back to parent as this is a shared state. First function in onChange
        props.onChecked(props.index); // To pass the index of selected checkbox back to parent. Second function in onChange
      }
    }));
  }

  ;
}

//Reference for writing card components bootstrap: https://react-bootstrap.github.io/components/cards/