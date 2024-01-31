import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ISelect } from '@/types';
import { ContainerSelectModal, ContainerInputModalSelect } from './styles';
import { SelectModalProps } from './interface';
import { ModalOptions } from './ModalOptions';
import { ArrowBottom } from '@/components/icons/ArrowBottom';
import { theme } from '@/shared';

export const SelectModal: React.FC<SelectModalProps> = ({
  options, titleModal, defaultOption, ...rest
}) => {
  const { setValue } = useFormContext();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);
  const [isSelectOption, setIsSelectOption] = useState<ISelect>(defaultOption);

  const handleSelectOption = useCallback((option: ISelect) => {
    setIsSelectOption(option);

    setValue(rest.name, option.value);
  }, [setValue, rest.name]);

  return (
    <ContainerSelectModal>
      {options && (
        <ModalOptions
          options={options}
          onClose={handleCloseModal}
          show={isOpenModal}
          onHide={handleCloseModal}
          placement="bottom"
          keyboard
          className="offcanvas-select-modal"
          backdropClassName="backdrop-offcanvas-select-modal"
          onSelect={handleSelectOption}
          titleModal={titleModal}
          selectOption={isSelectOption}
        />
      )}
      <button type="button" onClick={handleOpenModal} className="btn-open-modal" disabled={rest.disabled}>{null}</button>
      <ContainerInputModalSelect>
        <label htmlFor={rest.name} className={`${rest.loading ? '' : 'active'}`}>
          {rest.label}
          {!rest.loading && <ArrowBottom width={24} height={24} />}
        </label>
        <div className='select'>
          {isSelectOption.innerText}
        </div>
        {rest.loading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
        )}
        {rest.errorText && rest.errorText !== '' && (
          <p className="text-dark">{rest.errorText}</p>
        )}
      </ContainerInputModalSelect>
    </ContainerSelectModal>
  );
};
