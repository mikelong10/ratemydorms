const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// db variable referring to the ratemydorms MySQL database
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'ratemydorms'
})

// creates a new rating object and uses those fields as values to
// insert a new row in the rating table
app.post('/create', (req, res) => {
  const user = req.body.user;
  const dorm = req.body.dorm;
  const room = req.body.room;
  const bathroom = req.body.bathroom;
  const building = req.body.building;
  const location = req.body.location;
  const descr = req.body.descr;

  db.query(
    'INSERT INTO rating (room_rating, bathroom_rating, building_rating, location_rating, descr, user_id, dorm_id) VALUES (?,?,?,?,?,?,?)',
    [room, bathroom, building, location, descr, user, dorm],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

// works with Axios.get('http://localhost:3001/ratings') in App.js,
// trying to display all the ratings right when page loads,
// including the ratings already in the database, not just the ones just added
// app.get('/ratings', (req, res) =>  {
//   db.query('SELECT * FROM rating WHERE dorm_id IN (6,7)', (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.send(result);
//     }
//   });
// });

// to display the avg_rating for the current building
app.get('/avg-rating', (req, res) => {
  db.query('SELECT avg_rating FROM building WHERE name = "International Village"', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// to display the num_ratings for the current building
app.get('/num-ratings', (req, res) => {
  db.query('SELECT num_ratings FROM building WHERE name = "International Village"', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});