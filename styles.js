import styled from 'styled-components/native';
import { Button, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const MainHeader = styled.View`
  flex: 1;
  margin-top: ${RFValue(5)}px;
  display: flex;
  flex-direction: column;
`;

export const BoxSearchInput = styled.View`
  background-color: #FFF;
  border-radius: 5px;
  margin-top: -28px;
  margin: 0 24px;
  flex-direction: row;
  align-items: center;
`;

export const SearchInput = styled(TextInput)`
  flex: 1;
  height: 56px;
  padding: 0 20px;
  background-color: #FFF;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right-width: 1;
  border-right-color: #EBEBEB;
  color: #666666;
`;

export const ButtonSearchSubmit = styled(TouchableOpacity)`
  background-color: #FFF;
  height: 56px;
  padding: 0 12px;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const BoxTextDivisor = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: ${RFValue(5)}px;
`;

export const Line = styled.View`
  border-radius: 1;
  border-color: rgba(0, 0 , 0 , 0.4);
  border-width: 0.2px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrTextDivisor = styled.Text`
  text-align: center;
  padding: 0 ${RFValue(3)}px;
`;

export const BoxNumber = styled.View`
  flex: 1;
  position: relative;
  margin-top: ${RFValue(10)}px;
  margin-right: ${RFValue(20)}px;
  margin-left: ${RFValue(20)}px;
`;

export const ComandaNumber = styled.Text`
    text-align: center;
    font-size: ${RFValue(50)}px;
    color: #777777;
    font-weight: bold;
    text-shadow: -1px 1px 5px #dddddd;
`;

export const PositionBoxButton = styled.View`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
`;

export const CloseButton = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(232, 63, 91, 0.8);
  height: ${RFValue(20)}px;
  width: ${RFValue(20)}px;
  padding: ${RFValue(2)}px;
  border-radius: ${RFValue(10)}px;
`;

export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
  padding-top: ${RFValue(10)}px;
  margin-bottom: ${RFValue(5)}px;
  padding-right: ${RFValue(20)}px;
  padding-left: ${RFValue(20)}px;
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

export const Separator = styled.View`
  border-style: dashed;
  border-radius: 1;
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(10)}px;
  border-bottom-color: #000000;
  border-width: 1;
`;

export const FooterTitle = styled.Text`
  display: flex;
  font-weight: bold;
  font-size: ${RFValue(18)}px;
  text-align: center;
  margin-bottom: ${RFValue(4)}px;
`;

export const TransactionList = styled(FlatList)`
`;

export const ActiveView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  background-color: #F0F2F5;
  margin-left: ${RFValue(4)}px;
  margin-top: ${RFValue(4)}px;
  margin-bottom: ${RFValue(4)}px;
`;

export const HeaderBox = styled.View`
  min-width: 42px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: rgba(237, 27, 36, 0.7);
`;

export const HeaderFlexbox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ActiveHeader = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  color: #FFFFFF;
  text-shadow: -1px 1px 5px rgba(0, 0, 0, 0.75);
`;

export const ActiveBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  
  padding: 13px 24px;
  background-color: #FFFFFF;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 0.5;
  border-top-width: 0.5;
  border-top-color: rgba(0, 0, 0, 0.1);
`;

export const ActiveName = styled.Text`
  text-align: center;
  font-weight: bold;
`;

export const ActiveDesc = styled.Text`
  text-align: center;
`;

export const ActiveDate = styled.Text`
  text-align: center;
  font-style: italic;
  padding-top: ${RFValue(5)}px;
  font-size: ${RFValue(7)}px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ImageEmpty = styled.Image`
  width: 300px;
  height: 236px;
`;