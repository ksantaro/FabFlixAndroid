import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button } from 'react-native';

VIEW_TYPES = {
  LOGIN: "LOGIN",
  SEARCH: "SEARCH",
  SINGLE_MOVIE: "SINGLE_MOVIE"
}

type Props = {};
export default class SingleMovie extends Component<Props> {
  render() {
    const movie = this.props.movie;
    let genresString = "";
    let starsString = "";
    for (let i = 0; i < movie.genres.length; i++) {
      if (i !== 0) {
        genresString += ", ";
      }
      genresString += movie.genres[i].name;
    }

    for (let i = 0; i < movie.stars.length; i++) {
      if (i !== 0) {
        starsString += ", ";
      }
      starsString += movie.stars[i].name;
    }


    return (
      <View style={styles.container}>
        <View style={styles.input_containers}>
          <Button
            onPress={() => this.props.changeViewType(VIEW_TYPES.SEARCH)}
            title="Back to Search"
            color="gray"
            accessibilityLabel="Learn more about this purple button"
          />
          <Text style={styles.normalText}><Text style={styles.boldText}>Title: </Text>{movie.title}</Text>
          <Text style={styles.normalText}><Text style={styles.boldText}>Year: </Text>{movie.year}</Text>
          <Text style={styles.normalText}><Text style={styles.boldText}>Genres: </Text>{genresString}</Text>
          <Text style={styles.normalText}><Text style={styles.boldText}>Rating: </Text>{movie.rating}</Text>
          <Text style={styles.normalText}><Text style={styles.boldText}>Description: </Text>{movie.overview}</Text>
          <Text style={styles.normalText}><Text style={styles.boldText}>Actors: </Text>{starsString}</Text>
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  normalText: {
    fontSize: 18,
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold'
  }
});
