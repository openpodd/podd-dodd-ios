'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Component,
} = React;

var ReportFormContainer = React.createClass({
  
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight 
            style={styles.closeButton}
            onPress={this.props.closeModal}>
            <Text>Close</Text>
          </TouchableHighlight>
        </View>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.formContentContainer}>
            <ReportTypeButton title='Human'/>
            <ReportTypeButton title='Animal'/>
            <ReportTypeButton title='PublicHealth'/>
        </ScrollView>
      </View>
    );
  }
});

class ReportTypeButton extends Component {

  render() {
    return (
      <TouchableHighlight style={styles.typeButton}>
        <Text>{this.props.title}</Text>
      </TouchableHighlight>
    );
  }
}
module.exports = ReportTypeButton;


var styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#aaa',
  },

  header: {
    flex: 0.2,
    backgroundColor: '#ccc',
  },

  body: {
    flex: 0.8,
    backgroundColor: 'blue',
  },

  closeButton: {
    flex: 1,
    width: 100,
    height: 40,
  },

  scrollView: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  formContentContainer: {
  },

  typeButton: {
    flex: 1,
    height: 100,
    backgroundColor: '#bbb',
    alignItems: 'center',
  }, 
});


module.exports = ReportFormContainer;
