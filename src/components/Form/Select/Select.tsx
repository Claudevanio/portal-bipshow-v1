import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ArrowBottom } from '@/components/icons/ArrowBottom';
import { theme } from '@/shared';
import { ContainerSelect } from './styles';
import { ISelect } from './interface';

export const Select: React.FC<ISelect> = ({
  label, name, rules, errorText, options, loading, defaultValue, ...rest
}) => {
  const { control, getValues } = useFormContext();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || (options ? options[0].value : undefined)}
      rules={rules}
      render={({ field }) => (
        <ContainerSelect
          className={`${loading ? '' : 'active'} ${rest.disabled ? 'disabled' : ''} ${errorText && errorText !== '' ? 'error' : ''}`}
          onClick={() => {
            if (!rest.disabled) {
              setIsFocused(!isFocused);
            }
          }}
        >
          <label htmlFor={name} className={`${loading ? '' : 'active'}`}>
            {label}
            {!loading && <ArrowBottom width={24} height={24} />}
          </label>
          <select className="form-select" aria-label="Default select example" {...field} onChange={field.onChange} {...rest} disabled={rest.disabled} name={name}>
            {options?.map((item) => (
              getValues(name) === item.value ? (
                <option value={item.value} key={item.value} selected>{item.innerText}</option>
              ) : (
                <option value={item.value} key={item.value}>{item.innerText}</option>
              )
            ))}
          </select>
          {loading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {errorText && errorText !== '' && (
            <p className="text-dark">{errorText}</p>
          )}
        </ContainerSelect>
      )}
    />
  );
};
