import React from 'react';

import { cn } from '@/lib/utils';

import InputWrapper from '@/components/ui/Input/InputWrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { countryPhoneCodes, defaultCountryPhoneCodes, PhoneCodeType } from '@/constant/phone_code';

import { InputProps } from '@/types/Inputs';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & InputProps & {
  value?: string
  onChange?: (phoneNumber: { value: string, phoneCode: string }) => void
}

const PhoneNumber = React.forwardRef<HTMLInputElement, Props>(({ prefixIcon, suffixIcon, className, value = '', onChange, ...props }, ref) => {
  const splitDefaultValue: string[] = value?.split(' ')
  const phoneArea: string = splitDefaultValue[0].includes('+') ? splitDefaultValue[0] : ''
  const phoneNumber: string = phoneArea ? splitDefaultValue[1] : splitDefaultValue[0]

  const [firstDigit, ...restDigit] = phoneNumber
  const isStartWithZero: boolean = firstDigit === '0'
  const correctPhoneNumberValue = isStartWithZero ? restDigit.join('') : phoneNumber

  const [selected, setSelected] = React.useState<PhoneCodeType>(countryPhoneCodes.find((countryCode) => countryCode.code === phoneArea?.replace('+', '')) || defaultCountryPhoneCodes);

  const handleCountryCodeChange = (newCountryCode: PhoneCodeType) => {
    setSelected(newCountryCode)

    onChange?.({
      value: (correctPhoneNumberValue) as string,
      phoneCode: `+${newCountryCode.code}`
    })
  }

  const handleChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regexNumber = new RegExp(/^[0-9]*$/)

    if (event.target.value && !regexNumber.test(event.target.value)) return event.preventDefault()

    const [firstValue, ...phoneNumber] = event.target.value
    const correctPhoneNumber: string = firstValue === '0' ? phoneNumber.join('') : event.target.value

    onChange?.({
      value: correctPhoneNumber,
      phoneCode: correctPhoneNumber ? `+${selected.code}` : ''
    })
  }

  return (
    <div className='w-full flex flex-col gap-2'>
      <InputWrapper className={className} >
        <Select value={selected.iso}>
          <SelectTrigger className='w-fit'>
            <SelectValue aria-label={selected.iso} placeholder='Choose yes or no'>
              <Typography variant='text-body-l-medium' className="capitalize" >
                {selected.iso}
              </Typography>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countryPhoneCodes.map((countryCode) => <SelectItem key={countryCode.iso} value={countryCode.iso} onClick={() => handleCountryCodeChange(countryCode)}>{countryCode.country}</SelectItem>)}
          </SelectContent>
        </Select>
        {prefixIcon}
        <input
          {...props}
          type='tel'
          className={cn(['w-full'])}
          onChange={(event) => handleChangePhoneNumber(event)}
          value={correctPhoneNumberValue}
          ref={ref}
          minLength={6}
          maxLength={15}
        />
        {suffixIcon}
      </InputWrapper>
    </div>
  );
});

export default PhoneNumber;