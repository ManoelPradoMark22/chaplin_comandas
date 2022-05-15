import React from 'react';
import { Controller } from 'react-hook-form';

import { Input } from '../Input';

import { Container, Error } from './styles';

export function InputForm({
  control,
  name,
  multiline,
  error,
  ...rest
}) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
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