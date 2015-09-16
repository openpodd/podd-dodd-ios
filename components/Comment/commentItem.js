'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
} = React;

var Moment = require('moment');

class CommentItem extends Component {
  
  render() {
    return (
      <TouchableHighlight
        style={styles.commentItem}
        onPress={this.props.onSelectComment}>
        <View style={styles.commentBackground}>
          <Text>{this.props.rowData}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  commentItem: {
    flex: 1,
  },

  commentBackground: {
    backgroundColor: '#aaa',
    height: 44,
  }
});

module.exports = CommentItem;