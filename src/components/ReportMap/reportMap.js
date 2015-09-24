'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var _ = require('underscore');

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
    this.state = {
      mapRegion: null,
      mapRegionInput: null,
      annotations: null,
      isFirstLoad: true,
      selectingAnnotation: null,
      showReportModal: false,
    };
  }

  componentDidMount() {
    var thisObject = this;
    ReportCollectionStore.findAll((reports)=> {
      var annotations = _.map(reports, function(value, key){
        var annotation = value;
        annotation.id = value.id;
        annotation.title = value.content;
        annotation.subtitle = value.created;
        return annotation;
      });
      thisObject.setState({
        annotations: annotations,
      });
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

  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    alignItems: 'stretch',
    alignSelf: 'center',
  },

  modalUnderlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
    backgroundColor: '#000'
  },

  modal: {
    alignSelf: 'stretch',
    paddingTop: 40,
    marginHorizontal: 40,
  },

  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  feedContainer: {
  },

  dismissView: {
    position: 'absolute',
    top: -40,
    width: width,
    height: height,
    backgroundColor: 'transparent',
  },

});

module.exports = ReportMap;
