 import React, { useContext, useEffect, useState } from "react";
import "./Table.css";
import { DataContext } from "../../ContextAPI/DataContext";
import { Export } from "../Export/Export";

const Table = () => {
  // Getting current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  // Context values
  const { tableData, setDateFrom, setDateTo, cityName, setFileName } =
    useContext(DataContext);

  // Initializing the state variables
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [error, setError] = useState("");

  // Generating table and details on button click also checking all possible error conditions
  const handlechangedate = () => {
    if (selectedDateTo < selectedDate) {
      setError("Incorrect format, please select a valid date");
    } else if (selectedDate > today) {
      setError("Selected date is in the future!");
    } else if (selectedDateTo && selectedDate) {
      setDateFrom(selectedDate);
      setDateTo(selectedDateTo);
      setError("");
    } else {
      setError("Please select From and To dates");
    }
  };

  // Setting initial value
  useEffect(() => {
    setFileName(`${cityName}.csv`);
  }, [cityName]);

  const renderTableRows = () => {
    return tableData.map((item, index) => (
      <tr key={index}>
        <td>{item.date}</td>
        <td>{item.totalCases}</td>
        <td>{item.activeCases}</td>
        <td>{item.recovered}</td>
      </tr>
    ));
  };

  return (
    <div className="table-container">
      <div className="date">
        <div className="date-main">
          <h4>Choose the dates to generate customised results</h4>
          {/* date input from and to */}
          <input
            type="date"
            className="input-from"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <input
            type="date"
            className="input-to"
            onChange={(e) => setSelectedDateTo(e.target.value)}
          />
        </div>
        {error ? (
          <h5 style={{ color: "red", marginTop: "1rem" }}>{error}</h5>
        ) : (
          <></>
        )}
        <button
          type="button"
          className="btn btn-primary btn-sm requestbutton"
          id="generate-button"
          onClick={handlechangedate}
        >
          Generate
        </button>
      </div>

      {/* Bootstrap-styled table */}

      {/* Bootstrap-styled table with scrollbar */}
      {/* Custom-styled table with scrollbar */}

      {/* Custom-styled table with scrollbar */}
      <div
        className="custom-table-container"
        style={{ overflow: "auto", width: "100%", height: "386px" }}
      >
        <table
          className="custom-table table table-striped table-hover"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Cases</th>
              <th>Active Cases</th>
              <th>Recovered</th>
            </tr>
          </thead>
          <tbody>
            {/* Limit to show a maximum of 10 items */}
            {renderTableRows()}
          </tbody>
        </table>
      </div>

      {/* Add a scrollbar to the table if there are more than 10 items */}

      <Export />
    </div>
  );
};

export default Table;
