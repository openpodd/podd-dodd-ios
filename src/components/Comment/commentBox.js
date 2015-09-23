'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Text,
  View,
} = React;

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
    }; 
  }

  render() {
    return (
      <View style={styles.commentToolbar}>
        <TextInput
          style={[styles.commentInput, {height: 30}]}
          onChangeText={(comment) => this.setState({
            COMMENT: comment,
          })}
          placeholder='แสดงความคิดเห็น'
          multiline={true}
          value={this.state.comment}
        />

        <TouchableHighlight 
          style={styles.submitButton}
          onPress={this.onPressSubmit}>
          <Text style={styles.submitButtonTitle}>ยืนยัน</Text>
        </TouchableHighlight>
      </View>
    );
  }

  onPressSubmit() {

  }
};


var styles = StyleSheet.create({
  commentToolbar: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  commentInput: {
    flex: 4,
    margin: 8,
    backgroundColor: '#fff',
  },

  submitButton: {
    flex: 1,
    backgroundColor: '#777',
    marginVertical: 10,
    marginRight: 10,
    alignSelf: 'center',
  },

  submitButtonTitle: {
    textAlign:'center',
    color: '#fff',
    flex: 1,
  },
});


module.exports = CommentBox;
