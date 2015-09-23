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

var NearbyView = require('./src/views/nearby');
var FeedContainerView = require('./src/views/feed');
var ReportCollectionStore = require('./src/stores/ReportCollectionStore');
var IconIonic = require('react-native-vector-icons/Ionicons');


var PODDLive = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: 'nearby',
    }
  },

  render: function() {
    StatusBarIOS.setStyle('light-content');
    return (
      <TabBarIOS
        tintColor='#444'
        barTintColor='#fff'
        translucent={false}>

        <IconIonic.TabBarItem
          title='Near by'
          iconName="ios-location-outline"
          onPress={() => {
            this.setState({
              selectedTab: 'nearby'
            });
          }}
          selected={this.state.selectedTab === 'nearby'}>
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
