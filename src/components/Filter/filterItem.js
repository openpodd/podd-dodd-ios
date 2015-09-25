/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Component,
} = React;

var AppActions = require('../../actions/AppActions');

class FilterItem extends Component {
  render() {
    return (
      <View style={styles.row}>
        <TouchableHighlight 
          underlayColor='#aaa'
          onPress={this.onRowPress.bind(this)}
          style={styles.rowContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>{this.props.rowData.name}</Text> 
            <Text style={styles.subtitle}>{this.props.rowData.type}</Text> 
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  onRowPress() {
    AppActions.dismissFilterModal(this.props.rowData);
  }
};

var styles = StyleSheet.create({
  row: {
    alignItems: 'stretch',
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  rowContent: {
    flex: 1,
  },

  title: {
    fontWeight: '500',
  },

  subtitle: {
    fontWeight: '100',
  }
});


module.exports = FilterItem;