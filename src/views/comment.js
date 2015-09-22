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

var config = require('../../config.js');
var ReportCollectionStore = require('../../src/stores/ReportCollectionStore');

class CommentView extends Component {
  constructor(props) {
    super(props);
    this.closeSupportModalForm = this.closeSupportModalForm.bind(this);
    this.executeQuery = this.executeQuery.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      showSupportForm: false,
      report: this.props.rowData,
    }; 
  }

  componentWillMount() {
    this.executeQuery();
    ReportCollectionStore.addChangeListener(this.executeQuery);
  }

  componentWillUnmount() {
    ReportCollectionStore.removeChangeListener(this.executeQuery);
  }

  executeQuery() {
    var thisObject = this;
    ReportCollectionStore.findComment(thisObject.props.rowData.id, function(json) { 
      var report = ReportCollectionStore.find(thisObject.props.rowData.id);
      console.log('comment query via EventEmitter ' + report.like_count);
      thisObject.setState({
        dataSource: thisObject.state.dataSource.cloneWithRows(json),
        loaded: true,
        report: report,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <FeedItem rowData={this.state.report} onPressSupport={()=> {
            this.setState({
              showSupportForm: true,
            })
          }}/>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
              return (<CommentItem rowData={rowData}/>);
            }}/>
          
        </ScrollView>

        { this.state.showSupportForm ? 
          <SupportForm 
            rowData={this.props.rowData}
            onDismiss={this.closeSupportModalForm} 
            onSubmit={this.closeSupportModalForm}/> 
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

module.exports = CommentView;
