/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button
} from 'react-native';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { InputForm } from './src/components/InputForm';

import {
  Form,
  Fields,
  SubmitButton,
  TransactionList
} from './styles';

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  description: Yup
  .string()
  .required('Descrição é obrigatória'),
});

const App = () => {

  const { 
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const DATA_KEY = '@chaplinComandas:comandas';
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState(null);
  const [register, setRegister] = useState([]);
  const [existingName, setExistingName] = useState('');
  const [existingDesc, setExistingDesc] = useState('');

  /*
  async function loadRegisters(){
    const response = await AsyncStorage.getItem(DATA_KEY);
    const comandas = response ? JSON.parse(response) : [];

    setRegister(comandas);
  }
  */

  async function loadRegisterWhenScanned(idLido){
    try {
      const response = await AsyncStorage.getItem(DATA_KEY);
      const comandas = response ? JSON.parse(response) : [];
      comandas.map((comanda) => {
        if (comanda.id == idLido) {
          setValue('name', comanda.name)
          setValue('description', comanda.description)
          setExistingName(comanda.name);
          setExistingDesc(comanda.description);
        }
      })
    } catch (error){
      console.log(error);
      Alert.alert("Não foi possível salvar!");
    }
  }

  async function handleRegister(form) {
    const comandaAtualizada = {
      id: result,
      name: form.name,
      description: form.description
    }
    
    try {
      const data = await AsyncStorage.getItem(DATA_KEY);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        comandaAtualizada,
        ...currentData
      ]

      await AsyncStorage.setItem(DATA_KEY, JSON.stringify(dataFormatted));

      /*Resetando os campos após o cadastro:*/
      reset();
      setExistingName('');
      setExistingDesc('');

    } catch (error){
      console.log(error);
      Alert.alert("Não foi possível salvar!");
    }
  }

  onSuccess = (e) => {
    loadRegisterWhenScanned(e.data);
    setResult(e.data);
    setScan(false);
  }

  startScan = () => {
    setResult(null);
    setExistingName('');
    setExistingDesc('');
    reset();
    setScan(true);
  }

  async function startStorage (){
    try {
      const response = await AsyncStorage.getItem(DATA_KEY);
      if (!response) {
        let originalArray = [];

        for (let i=0; i<50; i++) {
          let newObject = {
            id: i,
            name: '',
            description: ''
          }
          originalArray.push(newObject);
        }
        await AsyncStorage.setItem(DATA_KEY, JSON.stringify(originalArray));
        console.log("array criado no localstorage!");
        setRegister(originalArray);
      } else {
        setRegister(JSON.parse(response));
      }
    } catch (error){
      console.log(error);
      Alert.alert("Erro ao checar o banco de dados local!");
    }
  }

  useEffect(() => {
    startStorage();
    //loadRegisters();
  },[]);

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
            { result &&
              <View style={styles.sectionMain}>
                <Text style={styles.centerText}>{result}</Text>
                <Form>
                  <Fields>
                    <InputForm
                      name="name"
                      value={existingName}
                      onChangeText={setExistingName}
                      control={control}
                      placeholder="Nome"
                      autoCapitalize="sentences"
                      autoCorrect={false}
                      error={errors.name && errors.name.message}
                    />
                    <InputForm
                      name="description"
                      value={existingDesc}
                      onChangeText={setExistingDesc}
                      multiline
                      control={control}
                      placeholder="Descrição"
                      autoCapitalize="sentences"
                      autoCorrect={false}
                      error={errors.description && errors.description.message}
                    />
                  </Fields>
                  <SubmitButton 
                    title="Salvar comanda"
                    onPress={handleSubmit(handleRegister)}
                  />
                </Form>
              </View>
            }
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
            <TransactionList 
              data={register}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Text>{`id: ${item.id}, name: ${item.name}, descrip: ${item.description}`}</Text>}
              ListEmptyComponent={
                <Text>LISTA VAZIA</Text>}
            />
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
