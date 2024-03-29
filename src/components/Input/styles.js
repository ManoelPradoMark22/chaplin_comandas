import styled from 'styled-components/native';
import { TextInput } from 'react-native'; 
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  width: 100%;
  padding: 16px 18px;

  font-size: ${RFValue(14)}px;

  color: #000000;
  background-color: #f9f9f9;
  border-radius: 5px;

  margin-bottom: 8px;
`;
