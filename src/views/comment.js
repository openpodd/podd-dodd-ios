'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
  TextInput,
  ScrollView,
  ListView,
} = React;

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var tabBarHeight = 48;
var navigationBarHeight = 64;
var commentBoxHeight = 44;
var contentHeight = height - navigationBarHeight - tabBarHeight - commentBoxHeight;

var Moment = require('moment');

var FeedItem = require('../components/Feed/feedItem');
var ReportFilterBox = require('../components/Report/reportFilter');
var CommentItem = require('../components/Comment/commentItem');
var CommentBox = require('../components/Comment/commentBox');
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
      comment: null,
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
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>รายงาน</Text>
        </View>
        <View style={{height:contentHeight}}>
          <ListView
            dataSource={this.state.dataSource}
            renderHeader={()=>{
              return (
                <FeedItem rowData={this.state.report} onPressSupport={()=> {
                  this.setState({
                    showSupportForm: true,
                  })
                }}/> 
              );
            }}
            renderRow={(rowData) => {
              return (
                <CommentItem rowData={rowData}/>
              );
            }}/>
        </View>
        <CommentBox/>
        { this.state.showSupportForm
          ? <SupportForm 
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

  headerContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    height: navigationBarHeight,
    backgroundColor: '#333',
    paddingTop: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '100',
    textAlign: 'center',
    alignItems: 'center',
    color: '#fff',
  },

  scrollView: {
    flex: 1,
    marginTop: 64,
    marginBottom: 50,
    backgroundColor: '#fff',
  },
  
});

module.exports = CommentView;
