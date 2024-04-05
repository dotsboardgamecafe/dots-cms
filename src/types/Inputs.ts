export type InputProps = {
  label?: string;
  horizontal?: {
    gap?: string;
  };
} & InputExtras;

export type InputExtras = {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
};