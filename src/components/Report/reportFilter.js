/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Image,
  Text,
  Navigator,
  TouchableHighlight,
  Component,
} = React;

var ReportFormContainer = require('../../views/reportForm');

class ReportFilterBox extends Component {
  render() {
    return (
      <View style={styles.filterBox}>
        <TouchableHighlight 
          underlayColor='#eee'
          style={styles.filterButtonContainer}>
          <View style={styles.filterButton}>
            <Text style={styles.filterButtonTitle}>กัลยานิวัฒนา</Text>
            <Image
              style={styles.filterArrow}
              resizeMode='contain'
              source={require('image!arrow-down')} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor='#eee'
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
	filterBox: {
    height: 64,
    backgroundColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 30,
    paddingBottom: 10,
  },

  filterButtonContainer: {
    backgroundColor: '#fff',
    flex: 4,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 6,
    marginHorizontal: 10,
  },

  filterButton: {
    flexDirection: 'row',
  },

  underlayColor: {
    backgroundColor: '#eee',
  },

  filterArrow: {
    width: 10,
    height: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  reportButton: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: '#eee',
    marginRight: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});


module.exports = ReportFilterBox;
