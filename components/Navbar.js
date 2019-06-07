import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button, TextInput } from 'react-native';

VIEW_TYPES = {
  LOGIN: "LOGIN",
  SEARCH: "SEARCH",
  SINGLE_MOVIE: "SINGLE_MOVIE"
}

type Props = {};
export default class MovieItem extends Component<Props> {
  render() {
    return (
      <View style={styles.navbarContainer}>
        <Text style={styles.navbar}>Fabflix</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  input_containers: {
    marginTop: 200,
    width: "80%",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  // container: {
  //   marginTop: 40,
  //   width: 100,
  //   // flex: 1,
  //   // justifyContent: 'center',
  // },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  navbar: {
    fontSize: 40,
    textAlign: 'center',
    color: 'red',
  },
  navbarContainer: {
    backgroundColor: 'black',
    borderBottomWidth: 1,
  }
});