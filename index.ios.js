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

  renderScene(route, navigator) {
    var Component = route.component;
    var navBar = route.navigationBar;

    if (navBar) {
        navBar = React.addons.cloneWithProps(navBar, {navigator, route});
    }
    return (
        <View style={styles.view}>
            {navBar}
            <Component {...route.passProps} navigator={navigator} route={route}/>
        </View>
    );
  },

  render: function() {
    return (
      <TabBarIOS>
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
          <View style={styles.container}></View>
        </TabBarIOS.Item>

        <TabBarIOS.Item 
          title="Notification"
          onPress={() => {
            this.setState({
              selectedTab: 'notification'
            });
          }}
          selected={this.state.selectedTab === 'notification'}>
          <View style={styles.container}></View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('PODDLive', () => PODDLive);
