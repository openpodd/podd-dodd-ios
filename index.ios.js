'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Navigator,
  NavigationBar,
  StatusBarIOS,
  Component,
} = React;

var IconIonic = require('react-native-vector-icons/Ionicons');

var NearbyView = require('./src/views/nearby');
var FeedContainerView = require('./src/views/feed');
var ProfileView = require('./src/views/profile');

var ReportModal = require('./src/components/Report/reportModal');
var ReportStore = require('./src/stores/ReportStore');
var AppClient = require('./src/utils/AppClient');
var AppActions = require('./src/actions/AppActions');

var PODDLive = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: 'nearby',
      showReportModal: ReportStore.shouldShowReportModal(),
      reportModal: null,
    }
  },

  componentWillMount: function() {
    ReportStore.addChangeListener(this.handleReportStoreEvent);
    AppClient.getAllReports();
  },

  componentWillUnmount: function() {
    ReportStore.removeChangeListener(this.handleReportStoreEvent);
  },

  handleReportStoreEvent: function() {
    var report = ReportStore.getCurrent();
    var dimissAction = ReportStore.shouldShowReportModal();
    if (report.id) {
      this.setState({
        reportModal: report,
      });
    }
    this.setState({
      showReportModal: dimissAction,
    });
  },

  render: function() {
    StatusBarIOS.setStyle('light-content');
    return (
      <View style={{flex:1}}>
        {this.renderTabBar()}
        {this.state.showReportModal 
          && this.state.reportModal 
          && this.state.selectedTab === 'nearby'
          ? <ReportModal 
              report={this.state.reportModal}
              onDismiss={this.dismissModal.bind(this)}/>
          : null
        }
      </View>
    );
  },

  dismissModal: function() {
    AppActions.dismissReportModal();
  },

  renderTabBar: function() {
    return (
      <TabBarIOS
          tintColor='#444'
          barTintColor='#fff'
          translucent={false}>

          <IconIonic.TabBarItem
            title='Near by'
            iconName="ios-location-outline"
            selected={this.state.selectedTab === 'nearby'}
            onPress={() => {
              this.setState({
                selectedTab: 'nearby'
              });
            }}>
            <Navigator
              configureScene={this.configureScene}        
              initialRoute={{
                name: 'Nearby',
                component: NearbyView,
              }}
              renderScene={this.renderScene}/>
          </IconIonic.TabBarItem>
                  
          <IconIonic.TabBarItem
            title="Feed"
            iconName="ios-chatboxes-outline"
            selected={this.state.selectedTab === 'feed'}
            onPress={() => {
              this.setState({
                selectedTab: 'feed'
              });
            }}>
            <Navigator
              configureScene={this.configureScene}        
              initialRoute={{
                name: 'Feed',
                component: FeedContainerView,
              }}
              renderScene={this.renderScene}/>
          </IconIonic.TabBarItem>
          
          <IconIonic.TabBarItem
            title="Profile"
            iconName="ios-person-outline"
            onPress={() => {
              this.setState({
                selectedTab: 'profile'
              });
            }}
            selected={this.state.selectedTab === 'profile'}>
             <Navigator
              configureScene={this.configureScene}        
              initialRoute={{
                name: 'Profile',
                component: ProfileView,
              }}
              renderScene={this.renderScene}/>
          </IconIonic.TabBarItem>

          <IconIonic.TabBarItem
            title="Notification"
            iconName="ios-bell-outline"
            onPress={() => {
              this.setState({
                selectedTab: 'notification'
              });
            }}
            selected={this.state.selectedTab === 'notification'}>
            <View></View>
          </IconIonic.TabBarItem>
      </TabBarIOS>
    );
  },

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.FloatFromRight; 
  },

  renderScene(route, navigator) {
    var Component = route.component;
    return (
        <View style={{flex: 1}}>
          <Component {...route.passProps} navigator={navigator} route={route}/>
        </View>
    );
  },
});

AppRegistry.registerComponent('PODDLive', () => PODDLive);
