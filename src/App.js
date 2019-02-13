import React, { Component } from "react";
import DeckGL from "deck.gl";
import { StaticMap } from "react-map-gl";
import { renderLayers } from "../src/components/Map";
// import { LayerControls, HEXAGON_CONTROLS } from './components/Control'
// import { tooltipStyle } from './components/Control/style'
import csvFile from "./data/ACT_Road_Crash_Data.1.csv";
import mobileData from "./data/Mobile_speed_cameras_in_Canberra.csv"
import { csv } from "d3-fetch";
import "./App.css";
import { renderMobileData } from "./components/Map/renderMobileData";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGVubnlwYW5nY29kZSIsImEiOiJjanJpb2dmbWUwM3p0M3ptYTk0a2N4MXBoIn0.HoDSIfRA2aPEH5zxXt8T2Q";

const INITIAL_VIEW_STATE = {
  longitude: 149.137,
  latitude: -35.24,
  zoom: 11,
  minZoom: 5,
  maxZoom: 16,
  pitch: 45,
  bearing: -27.396674584323023
};


function Map(props) {
  return (
    <DeckGL
      style={{ top: 24 }}
      layers={[
        ...renderLayers(props.crashPoints), 
        ...renderMobileData(props.mobilePoints)
      ]}
      initialViewState={INITIAL_VIEW_STATE}
      controller
    >
      <StaticMap
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    </DeckGL>
  );
}

export default class App extends Component {
  state = {
    allData: [],
    mobileData:[],
    yearToView: "2025"
  };

  componentDidMount() {
    this._processData();
    this._processMobileData();

    window.setYear = this.setYear; 
  }

  setYear = (year) => this.setState({
    yearToView: year
  })

  _processData() {
    csv(csvFile).then(x => {
      const allData = x.map(d => ({
        position: [Number(d.LONGITUDE), Number(d.LATITUDE)],
        pickup: true,
        // At some point, use a better date data structure
        // MomentJS or something?
        date: d.CRASH_DATE
      }));
      this.setState({
        allData
      });
    });
  }

  _processMobileData() {
    csv(mobileData).then(x => {
      const allData = x.map(d => ({
        position: [Number(d.LONGITUDE), Number(d.LATITUDE)],
        pickup: true,
      }));
      this.setState({
        mobileData: allData
      });
    });
  }

  getDataForYear = (allData, yearToView) => {
    return allData.filter(value => {
      if (value.date.includes(yearToView)) {
        return true;
      } else return false;
    });
  };

  handleChange = (e) => 
  this.setState({
    yearToView: e.currentTarget.value
  })

  render() {
    return (
      <>
        <div
          style={{
            position: "absolute",
            width: "100vw",
            top: 0,
            left: 0,
            zIndex: 100,
            backgroundColor: "white"
          }}
        >
          <input type='number' value={this.state.yearToView} onChange={this.handleChange}/>
        </div>
        <div>
          <Map
            mobilePoints={this.state.mobileData}

            crashPoints={this.getDataForYear(
              this.state.allData,
              this.state.yearToView
            )}
          />
        </div>
      </>
    );
  }
}
