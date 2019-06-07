import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import CarouselComponent from '../carousel';


class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
    };
    // goToRechargePage = () => {
    //   console.log('go to recharge page');
    //   this.props.navigation.navigate('Offers');
    // }
    render() {
      const {navigate} = this.props.navigation;
      return (
          <View style={styles.container}>
              <Text style={styles.welcome}>Welcome to Home Screen!</Text>
              <View>
                <Text>Recharge & Bill Payments</Text>
                <Button
                  onPress={(page) => navigate(page='Recharge')}
                  title="Recharge your phone"
                  accessibilityLabel="Click to recharge your phone"
                />
              </View>
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