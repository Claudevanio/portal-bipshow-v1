import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

import { Empty } from '@/components/Empty';
import { ContainerModalOptions } from './styles';
import { ModalOptionsProps } from './interface';

export const ModalOptions: React.FC<ModalOptionsProps> = ({
  options, titleModal, onSelect, selectOption, onHide, show, ...rest
}) => {
  const [isSearch, setIsSearch] = useState<string>();

  const recursiveSearch = useCallback((reactNode: any):any => {
    const children = reactNode?.props?.children || undefined;
    if (Array.isArray(reactNode)) {
        // Multiple children
        let joinedNodes: any[] = [];
        reactNode.forEach(node => {
            if (typeof node === "object") joinedNodes.push(recursiveSearch(node));
            else if (typeof node === "string") joinedNodes.push(node);
        });
        return joinedNodes.join(" ");
    }
    if (children === undefined) {
        if (typeof reactNode === "string") return reactNode;
        else return " ";
    }
    if (typeof children === "object") {
        // Found direct child
        return recursiveSearch(reactNode.props.children);
    }
    if (typeof children === "string") {
        // Found searchable string
        return reactNode.props.children;
    }
  },[]);

  const isSearchOptions = useMemo(() => {

    if (isSearch && isSearch !== '') {
      

      return options.filter((option) => {

        if(typeof option.innerText === "object") {
          const searchableText = recursiveSearch(option.innerText)
          if(searchableText.toUpperCase().search(isSearch.toUpperCase()) >= 0) return true;
          else return false;
        }

        if(typeof option.innerText === "string") {
          return option.innerText.toString().toLowerCase().includes(isSearch.toLocaleLowerCase())
        }

      });
    } if (!isSearch ?? isSearch !== '') {
      return options;
    }

    return [];
  }, [isSearch]);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setIsSearch(undefined);
      }, 300);
    }
  }, [show]);

  return (
    <ContainerModalOptions show={show} onHide={onHide} {...rest}>
      <div className="card-modal">
        <Offcanvas.Header>
          <h4>{titleModal}</h4>
          <input type="text" placeholder="Buscar..." onChange={(event) => setIsSearch(event.target.value)} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="list">
            <ul>
              {(isSearch || isSearch !== '') && isSearchOptions && (
                isSearchOptions.length > 0 ? (
                  isSearchOptions.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelect(option);
                          onHide();
                        }}
                        className={`${selectOption.value === option.value ? 'active' : ''}`}
                      >
                        <p className="text-dark">{option.innerText}</p>
                        <div className="radio">
                          <div />
                        </div>
                      </button>
                    </li>
                  ))
                ) : (
                  <div className="empty">
                    <Empty text="Nada encontrado" />
                  </div>
                ))}
              {(!isSearchOptions || !isSearch) && options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(option);
                      onHide();
                    }}
                    className={`${selectOption.value === option.value ? 'active' : ''}`}
                  >
                    <p className="text-dark">{option.innerText}</p>
                    <div className="radio">
                      <div />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Offcanvas.Body>
      </div>
    </ContainerModalOptions>
  );
};
