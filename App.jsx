import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from "react-mapbox-gl";
import { Icon, Menu } from 'semantic-ui-react';
import { parseString } from "xml2js";
import { Map } from "immutable";

const config = {
  "accessToken": "pk.eyJ1IjoiZmFicmljOCIsImEiOiJjaWc5aTV1ZzUwMDJwdzJrb2w0dXRmc2d0In0.p6GGlfyV-WksaDV_KdN27A",
  "style": "mapbox://styles/mapbox/dark-v9"
}

const { accessToken, style } = config;

const containerStyle = {
  height: "100vh",
  width: "100vw"
};

const styles = {
  menu: {
    position: "absolute",
    top: "0px",
    marginLeft: "10px",
    marginTop: "10px"
  }
}

const circleCoords = {
  chicago: [-87.623177, 41.881832],
  peoria: [-89.591834, 40.699880],
  aurora: [-88.318908, 41.762860],
  urbana: [-88.203826, 40.111106]
}

const cityCount = {
  chicago: 28,
  peoria: 4,
  aurora: 3,
  urbana: 1
}

const cityColor = {
  chicago: 'maroon',
  peoria: 'darkred',
  aurora: 'darkred',
  urbana: 'firebrick'
}

const maxBounds = [
      [-124.848974, 24.396308], // South West
      [-66.885444, 49.384358], // North East
];

export default class App extends Component {

  state = {
    activeItem: 'children',
    center: [-101.147518, 39.879491],
    zoom: [1]
  };

  _onDrag = () => {
    if (this.state.station) {
      this.setState({
        station: null
      });
    }
  };

  _polygonClicked = ({ feature }) => {
    console.log("Polygon clicked", feature.geometry.coordinates);
  };

  _setMove = (end) => {
    if(end !== this.state.end)
      this.setState({ end });
  };

  _onToggleHover(cursor, { map }) {
    map.getCanvas().style.cursor = cursor;
  }

  _onControlClick = (map, zoomDiff) => {
    const zoom = map.getZoom() + zoomDiff;
    this.setState({ zoom: [zoom] });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem} = this.state;

    return (
      <div>
        <ReactMapboxGl
          style={style}
          center={this.state.center}
          zoom={this.state.zoom}
          minZoom={1}
          maxZoom={15}
          maxBounds={maxBounds}
          accessToken={accessToken}
          onDrag={this._onDrag}
          onMoveEnd={this._setMove.bind(this, true)}
          onMove={this._setMove.bind(this, false)}
          containerStyle={containerStyle}>
          <ZoomControl
            zoomDiff={1}
            onControlClick={this._onControlClick}/>
          <Layer
            type="circle"
            paint={{
              "circle-radius": 30,
              "circle-color": cityColor.chicago,
              "circle-blur": 1
            }}>
            <Feature
              onClick={this._polygonClicked}
              coordinates={circleCoords.chicago}/>
          </Layer>
          <Layer
            type="symbol"
            layout={{
              "text-field": "28",
              "text-font": [
                  "DIN Offc Pro Medium",
                  "Arial Unicode MS Bold"
              ],
              "text-size": 12
            }}>
            <Feature
              onClick={this._polygonClicked}
              coordinates={circleCoords.chicago}/>
          </Layer>
          <Layer
            type="circle"
            paint={{
              "circle-radius": 30,
              "circle-color": cityColor.aurora,
              "circle-blur": 1
            }}>
            <Feature
              onClick={this._polygonClicked}
              coordinates={circleCoords.aurora}/>
          </Layer>
          <Layer
            type="symbol"
            layout={{
              "text-field": "4",
              "text-font": [
                  "DIN Offc Pro Medium",
                  "Arial Unicode MS Bold"
              ],
              "text-size": 12
            }}>
            <Feature
              onClick={this._polygonClicked}
              coordinates={circleCoords.aurora}/>
          </Layer>
          <Layer
            type="circle"
            paint={{
              "circle-radius": 30,
              "circle-color": cityColor.peoria,
              "circle-blur": 1
            }}>
            <Feature
              onClick={this._polygonClicked}
              coordinates={circleCoords.peoria}/>
          </Layer>
          <Layer
            type="symbol"
            layout={{
              "text-field": "3",
              "text-font": [
                  "DIN Offc Pro Medium",
                  "Arial Unicode MS Bold"
              ],
              "text-size": 12
            }}>
            <Feature
              onClick={this._polygonClicked}
              coordinates={circleCoords.peoria}/>
          </Layer>
          <Layer
            type="circle"
            paint={{
              "circle-radius": 30,
              "circle-color": cityColor.urbana,
              "circle-blur": 1
            }}>
            <Feature
              onClick={this._polygonClicked}
              coordinates={circleCoords.urbana}/>
          </Layer>
          <Layer
            type="symbol"
            layout={{
              "text-field": "1",
              "text-font": [
                  "DIN Offc Pro Medium",
                  "Arial Unicode MS Bold"
              ],
              "text-size": 12
            }}>
            <Feature
              onClick={this._polygonClicked}
              coordinates={circleCoords.urbana}/>
          </Layer>
        </ReactMapboxGl>
        <Menu style={styles.menu} icon='labeled' vertical>
          <Menu.Item name='adults' active={activeItem === 'adults'} onClick={this.handleItemClick}>
            <Icon name='male' />
            Adults
          </Menu.Item>
          <Menu.Item name='children' active={activeItem === 'children'} onClick={this.handleItemClick}>
            <Icon name='child' />
            Children
          </Menu.Item>
          <Menu.Item name='amber' active={activeItem === 'amber'} onClick={this.handleItemClick}>
            <Icon name='fire' />
            Amber Alerts
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
