export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value).replace(/(\.|,)00$/g, '');
};

export function snakeCaseToString(data?: string): string {
  if (!data || typeof data !== 'string') return ''

  return data.split('_').map((partString) => {
    const [firstLetter, ...restString] = partString.toLowerCase()
    return firstLetter.toUpperCase() + restString.join('')
  }).join(' ')
}

export function isValidEmailFormat(email: string): boolean {
  const emailRegexp = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)

  return emailRegexp.test(email)
}