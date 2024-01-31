import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ContainerRadio } from './styles';
import { IRadio } from './interface';

export const Radio: React.FC<IRadio> = ({
  id, name, label, readonly, defaultValue, remainColor = false, ...rest
}) => {
  const { control } = useFormContext();

  return (
    readonly ? (
      <ContainerRadio className={`form-check ${remainColor ? 'remain-color' : ''}`}>
        <input className="form-check-input" type="radio" value={rest.value} {...rest} />
        <label className={`form-check-label ${remainColor ? 'remain-color' : ''}`} htmlFor={`${id}-${rest.value}`}>
          {label}
        </label>
      </ContainerRadio>
    ) : (
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field: { name, onChange } }) => (
          <ContainerRadio className={`form-check ${remainColor ? 'remain-color' : ''}`}>
            <input className="form-check-input" name={name} type="radio" id={`${id}-${rest.value}`} value={rest.value}
            checked={control._getWatch(name) === rest.value}
            onChange={onChange} {...rest} />
            <label className={`form-check-label ${remainColor ? 'remain-color' : ''}`} htmlFor={`${id}-${rest.value}`}
              style={{
                paddingTop: 0,
              }}
            >
              {label}
            </label>
          </ContainerRadio>
        )}
      />
    )

  );
};
