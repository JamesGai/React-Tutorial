import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3500",
});

// Axios is a JavaScript library used for making HTTP requests from browsers and Node.js (similar to fetch API)

// To start a json server, type "npx json-server -p 3500 -w data/db.json" where data is the folder name and "db.json" is the file name
