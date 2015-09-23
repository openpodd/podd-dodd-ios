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
  TouchableOpacity,
  Component,
} = React;

var ReportCollectionStore = require('../../../src/stores/ReportCollectionStore');
var FeedItem = require('../Feed/feedItem');

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
          onAnnotationPress={(annotation)=>{
            this.setState({
              showReportModal: true,
              selectingAnnotation: annotation,
            });
          }}/>

        { this.state.showReportModal
          ? (<View style={styles.modalContainer}>
              <View style={styles.modalUnderlay}>
                <TouchableOpacity 
                  onPress={this.onDismissModal.bind(this)}
                  style={styles.dismissView}/>
              </View>
              <View style={styles.modal}>
                <FeedItem rowData={this.getSelectingReport()}/>
              </View>
            </View>)
          : null }
      </View>
    );
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
    width: width,
    height: height,
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
  },

  modalUnderlay: {
    position: 'absolute',
    width: width,
    height: height,
    left: 0,
    opacity: 0.2,
    backgroundColor: '#000'
  },

  modal: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    bottom: 100,
    backgroundColor: '#fff',
    opacity: 1,
    borderRadius: 4,
    overflow: 'hidden',
    padding: 10,
    alignSelf: 'center',
  },

  dismissView: {
    flex: 1,
  },
});

module.exports = ReportMap;
