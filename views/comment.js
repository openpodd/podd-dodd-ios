'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
  ScrollView,
  ListView,
} = React;

var FeedItem = require('../components/Feed/feedItem');
var CommentItem = require('../components/Comment/commentItem');
var SupportForm = require('../components/Report/supportForm');

class CommentView extends Component {

  constructor(props) {
    super(props);
    this.closeSupportModalForm = this.closeSupportModalForm.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => ri !== r2}),
      showSupportForm: false,
      selectingRowData: null,
      fetchURL: fetchURL,
    }; 
  }

  componentWillMount() {
    this.executeQuery();
  }

  executeQuery() {
    fetch(this.state.fetchURL)
      .then(response => response.json())
      .then(json => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(json),
            loaded: true,
          });
        })
      .catch(error =>  console.log('error ' + error));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <FeedItem rowData={this.props.rowData} onPressSupport={()=> {
            this.setState({
              showSupportForm: true,
              selectingRowData: this.props.rowData,
            })
          }}/>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
              return (<CommentItem rowData={rowData}/>);
            }} />
          
        </ScrollView>

        { this.state.showSupportForm ? 
          <SupportForm 
            rowData={this.state.selectingRowData}
            onPressLike={this.closeSupportModalForm} 
            onPressSupport={this.closeSupportModalForm} 
            onPressComment={(rowData)=>{
              this.closeSupportModalForm();
            }}/> 
          : null }
      </View>
    );
  }

  closeSupportModalForm() {
    this.setState({
      showSupportForm: false,
    });
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
    marginTop: 64,
    marginBottom: 50,
    backgroundColor: '#fff',
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'green',
  },
});

var fetchURL = 'http://localhost:8888/report/1/comments';
module.exports = CommentView;
