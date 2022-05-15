import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
  padding: 24px;
`;

export const Fields = styled.View``;

export const InputForm = styled(TextInput)`
  width: 100%;
  padding: 16px 18px;

  font-size: ${RFValue(14)}px;

  color: #000000;
  background-color: #FFFFFF;
  border-radius: 5px;

  margin-bottom: 8px;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  background-color: #FF872C;

  padding: 18px;
  border-radius: 5px;
  align-items: center;
`;

export const TitleButton = styled.Text`
  font-size:${RFValue(14)}px;
  color: #FFFFFF;
`;