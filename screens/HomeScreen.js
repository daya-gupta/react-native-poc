import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CarouselComponent from '../carousel';


class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
          // <CarouselComponent />
          <View style={styles.container}>
              <Text style={styles.welcome}>Welcome to Home Screen!</Text>
              <View>
                <CarouselComponent />
              </View>
          </View>
      );
    }
  }

  export default HomeScreen;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
  });