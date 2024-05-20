'use client';
import React from 'react';
import Select from 'react-select';

import InputWrapper from '@/components/ui/Input/InputWrapper';

const SelectMultiple = React.forwardRef<
  React.ElementRef<typeof Select>,
  React.ComponentPropsWithoutRef<typeof Select>
>
  ( ( { ...props }, ref ) => (
    <InputWrapper >
      <Select { ...props }
        ref={ ref }
        isMulti
        components={ {
          IndicatorSeparator: () => null,
        } }
        styles={ {
          container: ( base ) => ( {
            ...base,
            width: '100%',
            minHeight: '0px',
            padding: '0px'
          } ),
          indicatorSeparator: ( base ) => ( {
            ...base,
            marginTop: '0px',
            marginBottom: '0px'
          } ),
          indicatorsContainer: ( base ) => ( {
            ...base,
            padding: '0px',
          } ),
          control: ( base, props ) => ( {
            ...base,
            borderRadius: '3px',
            border: 'none',
            minHeight: '0px',
            borderColor: 'transparent',
            boxShadow: 'none'
          } ),
          valueContainer: ( base ) => ( {
            ...base,
            padding: '0px'
          } ),
          input: ( base ) => ( {
            ...base,
            padding: '0px',
            margin: '0px'
          } ),
          dropdownIndicator: ( base ) => ( {
            ...base,
            padding: '0px',
          } ),
          menu: ( base ) => ( {
            ...base,
            borderRadius: '8px',
            marginTop: '18px'
          } )
        } }
      />
    </InputWrapper>
  ) );

export default SelectMultiple;