/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
  TextInput
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';

const App = () => {

  const [scan, setScan] = useState(false)
  const [result, setResult] = useState()

  onSuccess = (e) => {
    setResult(e.data)
    setScan(false)
  }

  startScan = () => {
    setScan(true)
    setResult()
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          
          <View style={styles.body}>
            { !scan &&
              <View style={styles.sectionContainer}>
                <Button
                  title="Ler QrCode"
                  color="#f194ff"
                  onPress={this.startScan}
                />
              </View>
            }
            
              <View style={styles.sectionMain}>
                <Text style={styles.centerText}>1</Text>
                <TextInput placeholder="Nome cliente" name="name"/>
                <TextInput placeholder="Descrição" name="description" multiline/>
              </View>
            
            { scan &&
              <View style={styles.sectionContainer}>
                <QRCodeScanner
                  reactivate={true}
                  showMarker={true}
                  ref={(node) => { this.scanner = node }}
                  onRead={this.onSuccess}
                  topContent={
                    <Text style={styles.centerText}>
                      Escaneie seu QRCode!
                    </Text>
                  }
                  bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
                      <Text style={styles.buttonText}>Cancelar leitura</Text>
                    </TouchableOpacity>
                  }
                />
              </View>
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionMain: {
    marginTop: 10,
    flexDirection: 'column'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28,
    padding: 32,
    color: '#777',
    fontWeight: 'bold'
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 32
  },
});

export default App;
