import "./App.css";
import IVimg from "./iv.jpeg";
import React from "react";
import { useState } from "react";
import Axios from "axios";

function App() {
  // initializing variables
  const [user, setUser] = useState(0);
  const [dorm, setDorm] = useState(0);
  const [room, setRoom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [building, setBuilding] = useState(0);
  const [location, setLocation] = useState(0);
  const [descr, setDescr] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [newOvr, setOvr] = useState(0);
  const [numRatings, setNumRatings] = useState(0);

  // attempting to display the list of all ratings as soon as
  // you load the page, just like avg-rating and num-ratings below
  // Axios.get('http://localhost:3001/ratings')
  //   .then((res) => {
  //     // console.log(res.data);
  //     // setRoom(res.data.room_rating);
  //     res.data.map((rating) => rating.map)
  //     setRatings(res.data);
  //   })

  // to display the avg_rating for a building on the page
  Axios.get('http://localhost:3001/avg-rating')
    .then((res) => {
      const updatedAvg = res.data[0].avg_rating;
      setOvr(updatedAvg)
    })

  // to display the num_ratings for a building on the page
  Axios.get('http://localhost:3001/num-ratings')
    .then((res) => {
      const updatedNumRatings = res.data[0].num_ratings;
      setNumRatings(updatedNumRatings);
    })

  // to set each variable given by user input on the page
  const setInput = (e, inputType) => {
    if (inputType === "user") {
      setUser(e.target.value);
    }
    if (inputType === "dorm") {
      setDorm(e.target.value);
    }
    if (inputType === "room") {
      setRoom(e.target.value);
    }
    if (inputType === "bathroom") {
      setBathroom(e.target.value);
    }
    if (inputType === "building") {
      setBuilding(e.target.value);
    }
    if (inputType === "location") {
      setLocation(e.target.value);
    }
    if (inputType === "descr") {
      setDescr(e.target.value);
    }
  };

  // to add a new rating to the rating table,
  // to create a new rating object and add it to
  // the rating array
  const addRating = () => {
    Axios.post("http://localhost:3001/create", {
      user: user,
      dorm: dorm,
      room: room,
      bathroom: bathroom,
      building: building,
      location: location,
      descr: descr,
    }).then(() => {
      setRatings([
        { // this rating
          user: user,
          dorm: dorm,
          room: room,
          bathroom: bathroom,
          building: building,
          location: location,
          descr: descr,
        },
        ...ratings, // the rest of the ratings
      ]);
    });
  };

  // page content
  return (
    <div className="App">
      <h1>RateMyDorms</h1>
      <div className="content">
        <div className="information">
          <h2>Rating</h2>
          <div className="rating">
            <label>User ID</label>
            <input
              type="number"
              onChange={(event) => {
                setInput(event, "user");
              }}
            />
          </div>
          <div className="rating">
            <label>Dorm</label>
            <input
              type="number"
              onChange={(event) => {
                setInput(event, "dorm");
              }}
            />
          </div>
          <div className="rating">
            <label>Room</label>
            <input
              type="number"
              onChange={(event) => {
                setInput(event, "room");
              }}
            />
          </div>
          <div className="rating">
            <label>Bathroom</label>
            <input
              type="number"
              onChange={(event) => {
                setInput(event, "bathroom");
              }}
            />
          </div>
          <div className="rating">
            <label>Building</label>
            <input
              type="number"
              onChange={(event) => {
                setInput(event, "building");
              }}
            />
          </div>
          <div className="rating">
            <label>Location</label>
            <input
              type="number"
              onChange={(event) => {
                setInput(event, "location");
              }}
            />
          </div>
          <div className="rating">
            <textarea
              type="text"
              onChange={(event) => {
                setInput(event, "descr");
              }}
            />
          </div>
          <button onClick={addRating}>Submit</button>
        </div>
        <div className="ratings">
          <h2>International Village</h2>
          <img src={IVimg} alt="International Village"></img>
          <p>1155 Tremont St, Boston, MA 02120</p>
          <h3>Northeastern University</h3>
          <div className="school-overview">
            <div className="overview-section">
              <h2>{newOvr}</h2>
              <h3>Average Rating</h3>
            </div>
            <div className="overview-section">
              <h2>{numRatings}</h2>
              <h3>Number of Ratings</h3>
            </div>
          </div>
          {ratings.map((val, key) => {
            return (
              <div id="ratingsList">
                <div id="ratingsNums">
                  <h3 id="ratingVal">Room: {val.room}</h3>
                  <h3 id="ratingVal">Bathroom: {val.bathroom}</h3>
                  <h3 id="ratingVal">Building: {val.building}</h3>
                  <h3 id="ratingVal">Location: {val.location}</h3>
                </div>
                <p id="ratingDescr">{val.descr}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;