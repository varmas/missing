import React, { Component } from 'react';
import ReactMapboxGl, { Layer, ZoomControl, GeoJSONLayer } from 'react-mapbox-gl';
import { Icon, Menu, Button, Modal, Header, Rail, Label } from 'semantic-ui-react';

/* eslint-disable max-len */
const config = {
  accessToken: 'pk.eyJ1Ijoic3Jpa29uZHVydSIsImEiOiJjaXc1ODYwdmcwMHNiMnpzNWkzeHlzYXRuIn0.bXzvkf7SGj9zzaCXLNAhWQ',
  style: 'mapbox://styles/mapbox/dark-v9',
};
/* eslint-enable max-len */

const { accessToken, style } = config;

const containerStyle = {
  height: '100vh',
  width: '100vw',
};

const styles = {
  menu: {
    position: 'absolute',
    top: '0px',
    marginLeft: '10px',
    marginTop: '10px',
  },
  info: {
    height: 'auto',
    width: 'auto',
    marginTop: '10px',
    marginRight: '10px',
    padding: '0px',
  },
};

const colors = {
  high_risk: '#cc0000',
  medium_risk: '#990000',
  low_risk: '#660000',
};

const countries = {
  usa: {
    center: [-101.147518, 39.879491],
  },
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this._infoToggle = this._infoToggle.bind(this);
    this._noFeatureToggle = this._noFeatureToggle.bind(this);
    this._onControlClick = this._onControlClick.bind(this);
    this.state = {
      activeItem: 'children',
      center: countries.usa.center,
      zoom: [1],
      noFeature: false,
      info: false,
    };
  }

  _onControlClick(map, zoomDiff) {
    const zoom = map.getZoom() + zoomDiff;
    this.setState({ zoom: [zoom] });
  }

  _noFeatureToggle() {
    this.setState({
      noFeature: !this.state.noFeature,
    });
  }

  _infoToggle() {
    this.setState({
      info: !this.state.info,
    });
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    return (
      <div>
        <Modal
          key="noFeature"
          open={this.state.noFeature}
          onClose={this._noFeatureToggle}
          basic
          size="small"
        >
          <Header icon="browser" content="Unimplemented feature (absent data)" />
          <Modal.Content>
            <h3>This feature has not been implemented yet :[</h3>
            <h3>Instead of feeling angry you can help me out at <a href="https://github.com/varmas/missing/issues/6">https://github.com/varmas/missing/issues/6</a></h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green"
              onClick={this._noFeatureToggle}
              inverted
            >
              <Icon name="checkmark" /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal
          key="info"
          open={this.state.info}
          onClose={this._infoToggle}
          basic
          size="small"
        >
          <Header icon="browser" content="Missing info" />
          <Modal.Content>
            {/* eslint-disable max-len */}
            <h3>This site is designed to visualize missing people, both children and adults which can lead to better ways to analyze related patterns and factors</h3>
            <h3>Instead of feeling sad you can get more information and help me out at <a href="https://github.com/varmas/missing/">https://github.com/varmas/missing/</a></h3>
            {/* eslint-enable max-len */}
          </Modal.Content>
          <Modal.Actions>
            <Button color="green"
              onClick={this._infoToggle}
              inverted
            >
              <Icon name="checkmark" /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
        <ReactMapboxGl
          style={style}
          center={this.state.center}
          zoom={this.state.zoom}
          minZoom={2}
          maxZoom={10}
          accessToken={accessToken}
          containerStyle={containerStyle}
        >
          <ZoomControl
            zoomDiff={1}
            onControlClick={this._onControlClick}
            position="bottomLeft"
          />
            <GeoJSONLayer
              id="missing-children-json"
              data="missing-children.geojson"
              sourceOptions={{
                cluster: true,
                clusterMaxZoom: 10,
                clusterRadius: 30,
              }}
            />
            <Layer
              type="circle"
              sourceId="missing-children-json"
              paint={{
                'circle-color': colors.low_risk,
                'circle-radius': 20,
                'circle-blur': 0.7,
              }}
              layerOptions={{
                filter: ['any',
                  ['<', 'point_count', 10],
                  ['!has', 'point_count'],
                ],
              }}
            />
            <Layer
              type="circle"
              sourceId="missing-children-json"
              paint={{
                'circle-color': colors.medium_risk,
                'circle-radius': 25,
                'circle-blur': 0.7,
              }}
              layerOptions={{
                filter: ['all',
                  ['>=', 'point_count', 10],
                  ['<', 'point_count', 50],
                ],
              }}
            />
            <Layer
              type="circle"
              sourceId="missing-children-json"
              paint={{
                'circle-color': colors.high_risk,
                'circle-radius': 30,
                'circle-blur': 0.7,
              }}
              layerOptions={{
                filter: ['>=', 'point_count', 50],
              }}
            />
            <Layer
              type="symbol"
              sourceId="missing-children-json"
              layout={{
                'text-field': '1',
                'text-font': [
                  'DIN Offc Pro Medium',
                  'Arial Unicode MS Bold',
                ],
                'text-size': 15,
              }}
              layerOptions={{
                filter: ['!has', 'point_count'],
              }}
            />
            <Layer
              type="symbol"
              sourceId="missing-children-json"
              layout={{
                'text-field': '{point_count}',
                'text-font': [
                  'DIN Offc Pro Medium',
                  'Arial Unicode MS Bold',
                ],
                'text-size': 15,
              }}
              layerOptions={{
                filter: ['has', 'point_count'],
              }}
            />
        </ReactMapboxGl>
        <Rail style={styles.info} internal position="right">
          <div>
            <Label as="a" onClick={this._infoToggle}>
              <Icon name="info" />   About this site
            </Label>
            <Label as="a" href="https://github.com/varmas/missing">
              <Icon name="github" /> View on Github
            </Label>
          </div>
        </Rail>
        <Menu style={styles.menu} icon="labeled" vertical>
          <Menu.Item name="adults"
            active={this.state.activeItem === 'adults'} onClick={this._noFeatureToggle}
          >
            <Icon name="male" />
            Adults
          </Menu.Item>
          <Menu.Item name="children"
            active={this.state.activeItem === 'children'} onClick={this.handleItemClick}
          >
            <Icon name="child" />
            Children
          </Menu.Item>
          <Menu.Item name="amber"
            active={this.state.activeItem === 'amber'} onClick={this._noFeatureToggle}
          >
            <Icon name="fire" />
            Amber Alerts
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
