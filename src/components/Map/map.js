'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  MapView,
  Component,
} = React;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      mapRegionInput: null,
      annotations: null,
      isFirstLoad: true,
    };
  }

  render() {
    return (
      <MapView
        style={styles.container}
        region={this.state.mapRegion || undefined}
        annotations={this.state.annotations || undefined}
      />
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  }
});


module.exports = Map;
