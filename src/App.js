import React, { Component } from "react";
import sortBy from "sort-by";
import { lodash, isBetween } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import "./App.css";
import logo from "./logo.png";
import moment from "moment";
import TableComponent from "./components/TableComponent";
import PageLayout from "./components/PageLayout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      showAll: true
    };
  }
  componentDidMount() {
    //make request to API to get information
    fetch("https://d27pl0lcn7u1c9.cloudfront.net/devices.json")
      .then(response => response.json())
      .then(data => {
        this.setState({ patients: data });
      });
  }
  toggleDiv = () => {
    const showAll = this.state.showAll;
    this.setState({ showAll: !showAll });
  };

  render() {
    //show only patients with Params that =0, and sort by battery and last seen

    const filteredPatients = this.state.patients
      .filter(p => p.params === 0)
      .sort(sortBy("battery", "last_seen"));
    //return dates that where actice in past 20 days inclusive
    let cutOff = moment().subtract(20, "days").format().slice(0, 10);
    let activeInTwentyDays = this.state.patients.filter(function(p) {
      return p.last_seen.slice(0, 10) >= cutOff;
    });

    //declare csv Data that will be passed down to be able to download
    const csvData = this.state.showAll ? filteredPatients : activeInTwentyDays;

    return (
      <div className="contain">
        <div className="logo">
          <img src={logo} />
        </div>
        <h2 className="title">Patient List</h2>
        <div className="button-div">
          <button className="button-green" onClick={this.toggleDiv}>
            {" "}{this.state.showAll
              ? " Show Active Users in past 20 days"
              : "Show All"}
          </button>
          {/* I put the download link up top so that it would be easily found by users, would style to button later */}
          <CSVLink data={csvData}>Download CSV file of patients</CSVLink>
        </div>
        {/* Let users know which data is being shown */}
        <h4 className="title">
          {this.state.showAll
            ? "Showing All Results"
            : "Showing Last Active in 20 days"}
        </h4>

        <div>
          {/* table with information desired */}
          <TableComponent
            patients={
              this.state.showAll ? filteredPatients : activeInTwentyDays
            }
          />
          {/* way number 2 to style with button on the sides */}
          {/* <PageLayout>
            <TableComponent
              patients={
                this.state.showAll ? filteredPatients : activeInTwentyDays
              }
            />

            <button className="button-green" onClick={this.toggleDiv}>
              {" "}{this.state.showAll
                ? " Show Active Users in past 20 days"
                : "Show All"}
            </button>
            {/* I put the download link up top so that it would be easily found by users, would style to button later */}
          {/* <CSVLink data={csvData}>Download CSV file of patients</CSVLink>
          </PageLayout> */}{" "}
          */}
        </div>
      </div>
    );
  }
}

export default App;
