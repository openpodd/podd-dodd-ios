'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
  ListView,
  Navigator,
  NavigationBar,
} = React;

var Moment = require('moment');

class FeedItem extends Component {

  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.bold}>{this.props.rowData.created_by.display_name}</Text>
        <View style={styles.media}></View>
        <Text style={styles.text}>{Moment(this.props.rowData.modified).fromNow()}</Text>
        <Text style={styles.text}>{this.props.rowData.content}</Text>

        <View style={styles.score}>
          <Text>{this.props.rowData.encounter_count}</Text>
          <Text>ประสบด้วย</Text>
        </View>
        <View style={styles.score}>
          <Text>{this.props.rowData.like_count || '0' }</Text>
          <Text>ให้กำลังใจ</Text>
        </View>

        <TouchableHighlight
          style={styles.supportButton}
          onPress={this.onPressSupport.bind(this)}>
          <Text>สนับสนุน</Text>
        </TouchableHighlight>

        <View style={styles.rowSeparator}/>

        { this.props.modal ? 
          <View style={styles.footer}>
            <TouchableHighlight><Text>20 ความคิดเห็น</Text></TouchableHighlight>
            <View style={styles.action}>
              <TouchableHighlight><Text>Comment</Text></TouchableHighlight>
              <TouchableHighlight><Text>Share</Text></TouchableHighlight>
            </View>
          </View>
          : null }
        <View style={styles.rowSeparator}/>
     </View>
    );
  }

  onPressRow() {
    if (this.props.onPressRow) {
      this.props.onPressRow(this.props.rowData);
    }
  }

  onPressSupport(rowData) {
    if (this.props.onPressSupport) {
      this.props.onPressSupport(this.props.rowData);
    }
  }
}

var styles = StyleSheet.create({
  row: {
    backgroundColor: '#eee',
  },

  rowSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#888',
  },

  rowPress: {
    backgroundColor: '##fff',
  },

  bold: {
    flex: 1,
    fontWeight: '700',
  },

  text: {
    flex: 1,
    fontWeight: '100',
  },

  media: {
    flex: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    height: 200,
  },
});

module.exports = FeedItem;