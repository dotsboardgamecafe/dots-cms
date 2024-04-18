import React from 'react';

export type InputProps = {
  label?: string;
  horizontal?: {
    gap?: string;
  };
  inputClassName?: string;
} & InputExtras;

export type InputExtras = {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
};