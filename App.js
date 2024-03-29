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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconSearch from 'react-native-vector-icons/AntDesign';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { InputForm } from './src/components/InputForm';

import {
  MainHeader,
  BoxSearchInput,
  SearchInput,
  ButtonSearchSubmit,
  BoxTextDivisor,
  Line,
  OrTextDivisor,
  BoxNumber,
  ComandaNumber,
  PositionBoxButton,
  CloseButton,
  Form,
  Fields,
  ViewButton,
  SubmitButton,
  DeleteButton,
  FooterTitle,
  Separator,
  TransactionList,
  ActiveView,
  HeaderBox,
  HeaderFlexbox,
  ActiveHeader,
  ActiveBody,
  ActiveName,
  ActiveDesc,
  ActiveDate
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
  const [searchValue, setSearchValue] = useState('');

  async function loadRegisterWhenScanned(idLido){
    try {
      const response = await AsyncStorage.getItem(DATA_KEY);
      const comandas = response ? JSON.parse(response) : [];
      let achou = false;
      comandas.map((comanda) => {
        if (comanda.id == idLido) {
          setValue('name', comanda.name)
          setValue('description', comanda.description)
          setExistingName(comanda.name);
          setExistingDesc(comanda.description);
          setSearchValue('');
          setResult(idLido);
          achou = true;
        }
      });
      !achou && Alert.alert("Dados inseridos de forma errada!", "Digite o número de uma comanda EXISTENTE ou escaneie o qrcode de uma comanda EXISTENTE!");
    } catch (error){
      console.log(error);
      Alert.alert("Falha ao consultar comanda!");
    }
  }

  function loadRegisterAfterLongPress(data){
    setValue('name', data.name)
    setValue('description', data.description)
    setExistingName(data.name);
    setExistingDesc(data.description);
    setResult(data.id);
  }

  async function handleClean() {
    try {
      const comandaAtualizada = {
        id: result,
        name: '',
        description: '',
        date: ''
      }

      const data = await AsyncStorage.getItem(DATA_KEY);
      const currentData = data ? JSON.parse(data) : [];

      currentData.map((comanda, index) => {
        if (comanda.id == result) {
          currentData[index] = comandaAtualizada;
        }
      });

      await AsyncStorage.setItem(DATA_KEY, JSON.stringify(currentData));
      setRegister(currentData);

      /*Resetando os campos após o cadastro:*/
      closeInfo();

    } catch (error){
      console.log(error);
      Alert.alert("Não foi possível limpar!");
    }
  }

  async function handleRegister(form) {
    try {
      const comandaAtualizada = {
        id: result,
        name: form.name,
        description: form.description,
        date: Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date())
      }
      const data = await AsyncStorage.getItem(DATA_KEY);
      const currentData = data ? JSON.parse(data) : [];

      currentData.map((comanda, index) => {
        if (comanda.id == result) {
          currentData[index] = comandaAtualizada;
        }
      });

      await AsyncStorage.setItem(DATA_KEY, JSON.stringify(currentData));
      setRegister(currentData);

      /*Resetando os campos após o cadastro:*/
      closeInfo();

    } catch (error){
      console.log(error);
      Alert.alert("Não foi possível salvar!");
    }
  }

  function confirmCleaning() {
    Alert.alert(
      'ATENÇÃO! LIMPAR COMANDA!',
      'Deseja realmente LIMPAR essa comanda?',
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Confirmar", onPress: () => handleClean() }
      ]
    );
  }

  function confirmRegister(form) {
    Alert.alert(
      'ATENÇÃO!',
      'Deseja SALVAR as alterações nesta comanda?',
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Confirmar", onPress: () => handleRegister(form) }
      ]
    );
  }

  function handleSearch() {
    searchValue && loadRegisterWhenScanned(searchValue);
  }

  function closeInfo() {
    reset();
    setResult(null);
    setExistingName('');
    setExistingDesc('');
    setSearchValue('');
  }

  onSuccess = (e) => {
    loadRegisterWhenScanned(e.data);
    setScan(false);
  }

  startScan = () => {
    closeInfo();
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
            description: '',
            date: ''
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
              <MainHeader>
                <BoxSearchInput>
                  <SearchInput
                    onChangeText={setSearchValue}
                    value={searchValue}
                    keyboardType="numeric"
                    placeholder="Pesquisar pelo nº da comanda"
                  />
                  <ButtonSearchSubmit
                    activeOpacity={0.7}
                    onPress={handleSearch}
                  >
                    <IconSearch name="search1" size={24} color="#B2B2B2" />
                  </ButtonSearchSubmit>
                </BoxSearchInput>
                <BoxTextDivisor>
                  <Line/>
                  <OrTextDivisor>ou</OrTextDivisor>
                  <Line/>
                </BoxTextDivisor>
                <Button
                  title="Ler QrCode"
                  color="#f194ff"
                  onPress={this.startScan}
                />
              </MainHeader>
            }
            { result &&
              <View style={styles.sectionMain}>
                <BoxNumber>
                  <PositionBoxButton>
                    <CloseButton
                      onPress={closeInfo}
                      style={styles.shadow}
                      activeOpacity={0.6}
                    >
                      <Text style={styles.textClose}>X</Text>
                    </CloseButton>
                  </PositionBoxButton>
                  <ComandaNumber>{result}</ComandaNumber>
                </BoxNumber>
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
                  <View style={{ flex: 1, flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ViewButton>
                      <SubmitButton 
                        title="Salvar comanda"
                        onPress={handleSubmit(confirmRegister)}
                      />
                    </ViewButton>
                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <DeleteButton 
                        onPress={confirmCleaning}
                        style={styles.shadow}
                        activeOpacity={0.6}
                      >
                        <Icon name="broom" size={30} color="#FFFFFF"/>
                      </DeleteButton>
                    </View>
                  </View>
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
            <Separator/>
            <FooterTitle>Comandas ativas</FooterTitle>
            <TransactionList 
              data={register}
              keyExtractor={item => item.id}
              renderItem={({ item }) => item.description!=='' && 
                <TouchableOpacity 
                  style={styles.shadow}
                  activeOpacity={0.6}
                  onLongPress={() => loadRegisterAfterLongPress(item)}
                >
                  <ActiveView>
                    <HeaderBox>
                      <HeaderFlexbox>
                        <ActiveHeader>
                          {item.id}
                        </ActiveHeader>
                      </HeaderFlexbox>
                    </HeaderBox>
                    <ActiveBody>
                      <ActiveName>{item.name}</ActiveName>
                      <ActiveDesc>{item.description}</ActiveDesc>
                      <ActiveDate>{`(${item.date})`}</ActiveDate>
                    </ActiveBody>
                  </ActiveView>
                </TouchableOpacity>
              }
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
  shadow: {
    shadowColor: 'rgba(0,0,0, 0.6)', // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 4, //IOS
    elevation: 4, // Android
  },
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
  textClose: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
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
