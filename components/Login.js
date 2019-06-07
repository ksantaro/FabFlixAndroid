import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button, TextInput } from 'react-native';

VIEW_TYPES = {
  LOGIN: "LOGIN",
  SEARCH: "SEARCH",
  SINGLE_MOVIE: "SINGLE_MOVIE"
}

type Props = {};
export default class Login extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input_containers}>
          <Text style={styles.welcome}> Login</Text>
          <Text>Email</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15}}
            onChangeText={this.props.onChangeEmail}
            value={this.props.email}
          />
          <Text>Password</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30}}
            onChangeText={this.props.onChangePassword}
            value={this.props.password}
            secureTextEntry
          />
          <Button
            onPress={this.props.onSubmit}
            // style={styles.login_button}
            title="Login"
            color="red"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        
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
    marginTop: 100,
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
});
