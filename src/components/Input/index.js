import React from 'react';

import { Container } from './styles';

export function Input({...rest}){
  return (
    <Container 
      style={{
        textAlignVertical:'center',
      }}
      {...rest}
    />
  )
}