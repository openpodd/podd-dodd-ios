'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Component,
} = React;

var FilterView = require('./filterView');
var AppActions = require('../../actions/AppActions');

class ReportModal extends Component {

  render() {
    return (
      <View style={styles.modalContainer}>
          <View style={styles.modalUnderlay}>
            <TouchableOpacity 
              onPress={this.onDismissModal.bind(this)}
              style={styles.dismissView}/>
          </View>

          <View style={styles.modal}>
            <View style={styles.modalToolbar}>
              <TouchableOpacity 
                onPress={this.onDismissModal.bind(this)}
                style={styles.closeButton}>
                <Text style={styles.buttonTitle}>Reset</Text>
              </TouchableOpacity>

              <Text style={styles.modalToolbarTitle}>เลือกพื้นที่</Text>

              <TouchableOpacity 
                onPress={this.onDismissModal.bind(this)}
                style={styles.closeButton}>
                <Text style={styles.buttonTitle}>Close</Text>
              </TouchableOpacity>
            </View>

            <FilterView 
              filterList={styles.filterList}
              pointerEvents='auto'
              /> 
          </View>
      </View>
    );
  }

  onDismissModal() {
    AppActions.dismissFilterModal();
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

  dismissView: {
    width: width,
    height: height,
    opacity: 0.4,
    backgroundColor: '#000',
  },

  modal: {
    marginTop: 80,
    marginBottom: 80,
    marginHorizontal: 10,
  },

  modalToolbar: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  modalToolbarTitle: {
    flex: 2,
    textAlign: 'center',
  },

  filterList: {
    backgroundColor: '#fff',
  },

  closeButton: {
    flex: 1,
    justifyContent: 'center',
  },

  buttonTitle: {
    fontSize: 10,
    textAlign: 'center',
    color: '#333'
  },
});


module.exports = ReportModal;
