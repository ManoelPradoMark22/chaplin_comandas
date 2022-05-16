import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { Input } from '../Input';

import { Container, Error } from './styles';

export function InputForm({
  control,
  name,
  value,
  onChangeText,
  multiline,
  error,
  ...rest
}) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange:onChangeText, value:value } }) => (
          <Input
            onChangeText={onChangeText}
            multiline={multiline}
            value={value}
            {...rest}
          />
        )}
      />
      {error && <Error>{ error }</Error>}
    </Container>
  )
}