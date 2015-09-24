/* @flow */
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Component,
} = React;

var FeedItem = require('../Feed/feedItem');
var ReportStore = require('../../../src/stores/ReportStore');

class ReportModal extends Component {

  render() {
    return (
      <View style={styles.modalContainer}>
          <View style={styles.modalUnderlay}>
            <TouchableOpacity 
              onPress={this.onDismissModal.bind(this)}
              style={styles.dismissView}/>
          </View>

          <ScrollView 
            contentContainerStyle={styles.modalContentContainer}
            style={styles.modal}>
            <TouchableOpacity 
              onPress={this.onDismissModal.bind(this)}
              style={styles.dismissView}/>

            <View style={styles.feedContainer}>
              <FeedItem rowData={this.props.report}/>   
            </View>
          </ScrollView>
      </View>
    );
  }

  onDismissModal() {
    this.props.onDismiss && this.props.onDismiss();
  }
};


var styles = StyleSheet.create({
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
    opacity: 0.8,
    backgroundColor: '#000'
  },

  modal: {
    alignSelf: 'stretch',
    paddingTop: 60,
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


module.exports = ReportModal;
