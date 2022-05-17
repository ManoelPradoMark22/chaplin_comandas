import styled from 'styled-components/native';
import { Button, FlatList, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
  padding: 24px;
`;

export const Fields = styled.View``;

export const ViewButton = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: ${RFValue(14)}px;
  justify-content: center;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  padding: 18px;
  border-radius: 5px;
  align-items: center;
`;

export const DeleteButton = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E83F5B;
  height: ${RFValue(40)}px;
  width: ${RFValue(40)}px;
  padding: ${RFValue(2)}px;
  border-radius: ${RFValue(20)}px;
`;

export const FooterTitle = styled.Text`
  display: flex;
  font-weight: bold;
  font-size: ${RFValue(18)}px;
  text-align: center;
`;

export const Separator = styled.View`
  border-style: dashed;
  border-radius: 1;
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(10)}px;
  border-bottom-color: #000000;
  border-width: 1;
`;

export const TransactionList = styled(FlatList)`
`;