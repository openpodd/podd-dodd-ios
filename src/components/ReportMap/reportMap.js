'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  View,
  MapView,
  Text,
  ScrollView,
  TouchableOpacity,
  Component,
} = React;

var ReportCollectionStore = require('../../../src/stores/ReportCollectionStore');
var FeedItem = require('../Feed/feedItem');

var AppActions = require('../../actions/AppActions');
var AppConstants = require('../../constants/AppConstants');

class ReportMap extends Component {
  constructor(props) {
    super(props);
    this.executeQuery = this.executeQuery.bind(this);
    this.state = {
      mapRegion: null,
      mapRegionInput: null,
      annotations: null,
      isFirstLoad: true,
      selectingAnnotation: null,
      showReportModal: false,
    };
  }

  componentWillMount() {
    ReportCollectionStore.addChangeListener(this.executeQuery);
  }

  componentWillUnmount() {
    ReportCollectionStore.removeChangeListener(this.executeQuery);
  }

  executeQuery() {
    var reports = ReportCollectionStore.findAll();
    var annotations = [];
    reports.forEach(report => {
      var annotation = {};
      annotation.id = report.id;
      annotation.title = report.content;
      annotation.subtitle = report.created;
      annotation.latitude = report.latitude;
      annotation.longitude = report.longitude;
      annotations.push(annotation);
    });
    this.setState({
      annotations: annotations,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapView}
          region={this.state.mapRegion || undefined}
          annotations={this.state.annotations || undefined}
          onAnnotationPress={this.onPressAnnotation.bind(this)}/>
      </View>
    );
  }

  onPressAnnotation(annotation) {
    AppActions.viewReportModal(annotation.id);
  }

  onDismissModal() {
    this.setState({
      showReportModal: false,
    });
  }

  getSelectingReport() {
    var annotation = this.state.selectingAnnotation;
    var report = ReportCollectionStore.find(annotation.id);
    return report;
  }

};

var styles = StyleSheet.create({

  container: {
    flex: 3,
  },

  mapView: {
    flex: 1,
  },
});

module.exports = ReportMap;
