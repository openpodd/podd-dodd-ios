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
var SupportForm = require('./supportForm');

class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSupportForm: false,
    };
  }

  render() {
    return (
      <View style={styles.modalContainer}>
          <View style={styles.modalUnderlay}>
            <TouchableOpacity 
              onPress={this.onDismissModal.bind(this)}
              style={styles.dismissView}/>
          </View>

          { this.state.showSupportForm 
            ? this.renderSupportForm()
            : this.renderReportContainer()
          }
      </View>
    );
  }

  renderReportContainer() {
    return (
      <ScrollView 
        contentContainerStyle={styles.modalContentContainer}
        style={styles.modal}>
        <TouchableOpacity 
          onPress={this.onDismissModal.bind(this)}
          style={styles.dismissView}/>

        <View style={styles.feedContainer}>
          <FeedItem 
            modal 
            rowData={this.props.report}
            onPressSupport={(rowData)=>{
              this.setState({
                showSupportForm: true,
              });
            }}/>   
        </View>
      </ScrollView>
    );
  }

  renderSupportForm() {
    return (
      <SupportForm 
        rowData={this.props.report}
        onDismiss={this.onCloseSupportModalForm.bind(this)}
        onSubmit={this.onCloseSupportModalForm.bind(this)}/>
    );
  }

  onDismissModal() {
    this.props.onDismiss && this.props.onDismiss();
  }

  onCloseSupportModalForm() {
    this.setState({
      showSupportForm: false,
    });
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
