/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Alert, Image} from 'react-native';

var MOVIES = [
    {
      title: 'oooooo',
      year: '2015',
      posters: {thumbnail: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-4.jpg'}
    }
];
var REQUEST_URL =
    "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class FlexDimensionsBasics extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
        movies: [],
        loaded: false
    };

    // bind
      this.fetchMovies = this.fetchMovies.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

    renderMovie(movie) {
    console.log('======');
    console.log(movie);
      return (
          <View style={styles.container}>
              <Image
                  source={{uri: movie.item.posters.thumbnail}}
                  style={styles.thumbnail}
              />
              <View style={styles.rightContainer}>
                  <Text style={styles.title}>{movie.item.title}</Text>
                  <Text style={styles.year}>{movie.item.year}</Text>
              </View>
          </View>
      );
    }

  render() {

    if (!this.state.loaded) {
        return (
            <View style={styles.container}>
                <Text>
                    正在加载电影数据……
                </Text>
            </View>
        );
    }

    if (this.state.loaded) {
        console.log('---------------');
        console.log(this.state.movies[0].posters.thumbnail);
        console.log(this.state.movies);
      return (
          <FlatList
              data={this.state.movies}
              renderItem={this.renderMovie}
              style={styles.list}
              keyExtractor={item => item.id}
          />
      );
    }

      let movie = MOVIES[0];
    return (
        /* flexDirection: column, row, column-reverse, row-reverse*/
        <View style={{
            flex: 1,
            flexDirection: 'column',
            /*space-between center*/
            /*justifyContent: 'center'*/
        }}>
          <View style={styles.container}>
              <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail}/>
              <View style={styles.rightContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.year}>{movie.year}</Text>
              </View>
          </View>
          <View style={{flex: 3, backgroundColor: 'powderblue'}}>
            <TextInput
                style={{height: 40}}
                placeholder="Type here to translate!"
                onChangeText={(text) => this.setState({text})}/>
            <Text style={{padding: 10, fontSize: 42}}>
                {this.state.text.split(' ').map((word) => word && 'K').join(' ')}
            </Text>

            <Button onPress={() => {
              Alert.alert("You click me!");
            }} title="Click me!" />
          </View>
        </View>
    )
  }

    fetchMovies() {
      fetch(REQUEST_URL)
          .then((response) => response.json())
          .then((responseData) => {
              this.setState({
                  movies: this.state.movies.concat(responseData.movies),
                  loaded: true
              });
          })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 53,
        height: 81
    }
});
