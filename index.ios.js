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
  Component,
} = React;

var NearbyView = require('./views/nearby');
var FeedContainerView = require('./views/feed');

var PODDLive = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'nearby',
    }
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor='#000'
        barTintColor='#fff'
        translucent={false}>

        <TabBarIOS.Item
          title="Nearby"
          onPress={() => {
            this.setState({
              selectedTab: 'nearby'
            });
          }}
          selected={this.state.selectedTab === 'nearby'}>

          <Navigator
            configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              return Navigator.SceneConfigs.FloatFromRight;
            }}        
            initialRoute={{
              name: 'Nearby',
              component: NearbyView,
            }}
            renderScene={this.renderScene}/>
        </TabBarIOS.Item>
                
        <TabBarIOS.Item 
          title="Feed"
          selected={this.state.selectedTab === 'feed'}
          onPress={() => {
            this.setState({
              selectedTab: 'feed'
            });
          }}>

          <Navigator
            configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              return Navigator.SceneConfigs.FloatFromRight;
            }}        
            initialRoute={{
              name: 'Feed',
              component: FeedContainerView,
            }}
            renderScene={this.renderScene}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item 
          title="Profile"
          onPress={() => {
            this.setState({
              selectedTab: 'profile'
            });
          }}
          selected={this.state.selectedTab === 'profile'}>
          <View></View>
        </TabBarIOS.Item>

        <TabBarIOS.Item 
          title="Notification"
          onPress={() => {
            this.setState({
              selectedTab: 'notification'
            });
          }}
          selected={this.state.selectedTab === 'notification'}>
          <View></View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
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
