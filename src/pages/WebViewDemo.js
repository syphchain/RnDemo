
import React, { Component } from 'react';
import WebView from 'react-native-webview';

export default class WebViewDemo extends Component {
  render () {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>This is a static HTML source!</h1>' }}
      />
    );
  }
}