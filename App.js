/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ToastAndroid} from 'react-native';
import Login from './components/Login';
import Search from './components/Search';
import SingleMovie from './components/SingleMovie';
import Navbar from './components/Navbar';
import axios from 'axios';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const VIEW_TYPES = {
  LOGIN: "LOGIN",
  SEARCH: "SEARCH",
  SINGLE_MOVIE: "SINGLE_MOVIE"
}

// GATEWAY_API = "http://127.0.0.1:2311/api/g";
const GATEWAY_API = "http://128.195.69.206:2311/api/g";

const PATH = {
  LOGIN: "/idm/login",
  SEARCH: "/movies/search",
  GET_MOVIE: "/movies/get"
}

const ENDPOINTS = {
  LOGIN: GATEWAY_API + PATH.LOGIN,
  SEARCH: GATEWAY_API + PATH.SEARCH,
  GET_MOVIE: GATEWAY_API + PATH.GET_MOVIE,
  REPORT: GATEWAY_API + '/report'
}

const STATUS_NO_CONTENT_204 = 204;

const startingState = {
  view: VIEW_TYPES.LOGIN,
  sessionID: null,
  email: null,

  //login
  login_email: "",
  login_password: "",

  //search
  search: "",
  movies: [],

  //single movie
  movie: null,
}

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      view: VIEW_TYPES.LOGIN,
      sessionID: null,
      email: null,

      //login
      login_email: "",
      login_password: "",

      //search
      search: "",
      movies: [],

      //single movie
      movie: null,
    }
  }

  /* ALL */
  changeViewType = (view) => {
    this.setState({
      view: view
    })
  }

  toastNotification = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  getTransaction = (transactionId, delay, successFunction) => {
      let config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'transactionID': transactionId
        }
      }


      setTimeout(
        () => {
          axios.get(ENDPOINTS.REPORT, config)
          .then((response) => {
            let status = response.status;
            // console.log(response);
            // let status = 
            console.log(status !== STATUS_NO_CONTENT_204)
            if (status !== STATUS_NO_CONTENT_204) { // got a response
              successFunction(response);
            } else {
                this.getTransaction(transactionId, delay, successFunction);
            }
          })
          .catch((error) => {
            console.log(error);
            // console.log(error);
          });
        }
        , parseInt(delay));
        
  }

  /* Login Functions */
  onChangeEmail = (email) => {
    this.setState({
      login_email: email
    });
  }

  onChangePassword = (password) => {
    this.setState({
      login_password: password
    });
  }

  onSubmitLogin = () => {
    let data = {
      email: this.state.login_email,
      password: this.state.login_password,
    }
  
    let config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    axios.post(ENDPOINTS.LOGIN, data, config)
    .then((response) => {
      let delay = response.headers.delay;
      let transactionId = response.headers.transactionid;
      // console.log(response.headers);
      this.getTransaction(transactionId, delay, (res) => {
        // console.log(res.data);
        // this.toastNotification(res.data.message);
        if (res.data.resultCode === 14) {
          this.toastNotification("Invalid Email");
        } else if (res.data.resultCode === 11) {
          this.toastNotification("Invalid Password");
        } else if (res.data.resultCode === 120) {
          this.setState({
            email: this.state.login_email,
            sessionID: res.data.sessionID,
            view: VIEW_TYPES.SEARCH
          })
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  signOut = () => {
    this.setState(startingState);
  }

  /* Search Functions */
  onChangeSearch = (search) => {
    this.setState({
      search: search
    });
  }

  onSubmitSearch = () => {
    
    let config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'email': this.state.email,
        'sessionID': this.state.sessionID,
      },
      params: {title: this.state.search}
    }

    axios.get(ENDPOINTS.SEARCH, config)
    .then((response) => {
      let delay = response.headers.delay;
      let transactionId = response.headers.transactionid;

      // console.log(response.headers);
      // this.toastNotification("transactionID: " + transactionId);
      this.getTransaction(transactionId, delay, (res) => {
        console.log(res.data);
        console.log(res.data.movies);
        // this.toastNotification(res.data.message);

        this.setState({
          movies: res.data.movies
        });
      });
    })
    .catch((error) => {
      // console.log(error);
    });
  }

  /* Single Movie Functions */
  getMovie = (movieId) => {
    // this.changeViewType(VIEW_TYPES.SINGLE_MOVIE);
    // $.ajax({
    //   url: gatewayAPI + moviesPath + "/get/" + MOVIE_ID,
    //   headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //       'email': localStorage.getItem("email"),
    //       "sessionID": localStorage.getItem("sessionID")
    //   },
    //   type: "GET",
    //   complete : function() {
    //       console.log(this.url)
    //   },
    //   success: getMovieDetailsSuccess,
    //   error: function (res) {
    //       console.log("error: " + res);
    //   }
    // });
    let config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'email': this.state.email,
        'sessionID': this.state.sessionID,
      },
    }

    axios.get(ENDPOINTS.GET_MOVIE + "/" + movieId, config)
    .then((response) => {
      let delay = response.headers.delay;
      let transactionId = response.headers.transactionid;

      this.getTransaction(transactionId, delay, (res) => {
        console.log(res.data);
        // this.toastNotification(res.data.message);

        this.setState({
          view: VIEW_TYPES.SINGLE_MOVIE,
          movie: res.data.movie
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    let currentView = <Text>currentView</Text>
    if (this.state.view === VIEW_TYPES.LOGIN) {
      currentView = 
        <Login 
          changeViewType={this.changeViewType}
          onChangeEmail={this.onChangeEmail}
          onChangePassword={this.onChangePassword}
          email={this.state.login_email}
          password={this.state.login_password}
          onSubmit={this.onSubmitLogin}
          toastNotification={this.toastNotification}
        />

    } else if (this.state.view === VIEW_TYPES.SEARCH) {
      currentView = 
        <Search 
          changeViewType={this.changeViewType}
          search={this.state.search}
          onChangeSearch={this.onChangeSearch}
          onSubmit={this.onSubmitSearch}
          movies={this.state.movies}
          toastNotification={this.toastNotification}
          getMovie={this.getMovie}
        />

    } else if (this.state.view === VIEW_TYPES.SINGLE_MOVIE) {
      currentView = 
        <SingleMovie 
          changeViewType={this.changeViewType}
          movie={this.state.movie}
          backToSearch={() => {this.changeViewType(VIEW_TYPES.SEARCH)}}
        />
    }

    return (
      <View>
        <Navbar />
        {currentView}
      </View>
    );
  }
}

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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  background: {
    // flex: 1,
    // backgroundColor: 'black',
    // color: 'white',
  }
});
