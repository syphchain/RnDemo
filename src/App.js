import React, {Component} from "react";
import {StyleSheet, Alert, View, Button, Text} from "react-native";

import WebView from 'react-native-webview';

const patchPostMessageFunction = () => {
  const originalPostMessage = window.postMessage;

  const patchedPostMessage = (message, targetOrigin, transfer) => {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  console.log('inject postMessage');
  window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      webViewData: ''
    };
    this.data = 0;
  }

  sendMessage() {
    this.refs.webview.postMessage(++this.data);
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{width: 375, height: 220}}>
          <WebView
            ref={'webview'}
            injectedJavaScript={patchPostMessageJsCode}
            style={{width: 375, height: 220}}
            source={{uri: 'file:///android_asset/widget/web.html'}}
            onMessage={(e) => {
              this.handleMessage(e);
            }}
          />
        </View>
        <Text>来自webview的数据 : {this.state.webViewData}</Text>
        <Button title="发送数据到WebView" onPress={() => {
          this.sendMessage()
        }} />
      </View>
    );
  }

  handleMessage(e) {
    Alert.alert(e.nativeEvent.data);
    this.setState({webViewData: e.nativeEvent.data});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
