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

var ReportModal = require('./src/components/Report/reportModal');
var ReportStore = require('./src/stores/ReportStore');
var UserDefaults = require('react-native-userdefaults-ios');

var PODDLive = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: 'nearby',
      showReportModal: false,
      reportModal: null,
    }
  },

  componentWillMount: function() {
    ReportStore.addChangeListener(this.handleReportStoreEvent);
  },

  componentWillUnmount: function() {
    ReportStore.removeChangeListener(this.handleReportStoreEvent);
  },

  handleReportStoreEvent: function() {
    var thisObject = this;
    UserDefaults.objectForKey('REPORT_MODAL')
      .then(obj=>{
        ReportStore.get(obj, function(report){
          thisObject.setState({
            showReportModal: true,
            reportModal: report,
          });
        });
      })
  },

  render: function() {
    StatusBarIOS.setStyle('light-content');
    return (
      <View style={{flex:1}}>
        {this.renderTabBar()}
        {this.state.showReportModal && this.state.reportModal
          ? <ReportModal 
              report={this.state.reportModal}
              onDismiss={this.dismissModal.bind(this)}/>
          : null
        }
      </View>
    );
  },

  dismissModal: function() {
    this.setState({
      showReportModal: false,
    })
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
            <View></View>
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
    var navBar = route.navigationBar;
    if (navBar) {
        navBar = React.addons.cloneWithProps(navBar, {navigator, route});
    }

    return (
        <View>
          {navBar}
          <Component {...route.passProps} navigator={navigator} route={route}/>
        </View>
    );
  },
});

AppRegistry.registerComponent('PODDLive', () => PODDLive);
