import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button, TextInput } from 'react-native';
import MovieItem from './MovieItem';

VIEW_TYPES = {
  LOGIN: "LOGIN",
  SEARCH: "SEARCH",
  SINGLE_MOVIE: "SINGLE_MOVIE"
}

type Props = {};
export default class Search extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input_containers}>
          <Text style={styles.welcome}>Search Movies by Title</Text>
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
              onChangeText={this.props.onChangeSearch}
              value={this.props.search}
            />
          <Button
            onPress={this.props.onSubmit}
            title="search"
            color="#399af1"
            styles={{width: 100, marginBottom: 20}}
            accessibilityLabel="Learn more about this purple button"
          />
          {this.props.movies.map((movie) => {
            return <MovieItem movie={movie} key={movie.movieId} toastNotification={this.props.toastNotification} getMovie={this.props.getMovie}/>
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  input_containers: {
    width: "80%",
    marginTop: 10,
  },
  welcome: {
    fontSize: 22,
    margin: 1,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
