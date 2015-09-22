/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Component,
  Navigator,
} = React;

var ReportFormContainer = require('../../views/reportForm');

class ReportButton extends Component {

  render() {
    return (
      <View style={styles.reportButtonContainer}>
        <Text>Post a new report</Text>
        <TouchableHighlight 
          style={styles.reportButton}
          onPress={this.onPress.bind(this)}>
          <Text>Report</Text>
        </TouchableHighlight>
      </View>
    );
  }

  onPress() {
    this.props.navigator.push({
        component: ReportFormContainer,
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        passProps: {
          closeModal: this.onClose.bind(this),
        }
    });
  }

  onClose() {
    this.props.navigator.pop();
  }
}

var styles = StyleSheet.create({

	reportButtonContainer: {
    padding: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },

  reportButton: {
    backgroundColor: '#999',
    padding: 10,
    marginVertical: 10,
  },
});


module.exports = ReportButton;
