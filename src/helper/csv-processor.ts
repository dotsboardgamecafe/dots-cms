import { NestedKeyOf } from "@/types/common"

export function ConvertStringCSVToArray(csvString: string, separator: string | RegExp, removeExtraQuotes?: boolean) {
  if (!csvString) return []
  const characters: string[] = csvString.split('')
  const rows: string[] = []
  let keepAsOneWord = false
  let tempWord = ''
  for (let i = 0; i < characters.length; i++) {
    const previousCharacter = characters[i - 1]
    const currentCharacter = characters[i]
    const nextCharacter = characters[i + 1]
    const nextTwoCharacter = characters[i + 2]
    const isDoubleQuotes = currentCharacter === '"'

    const isSeparator = typeof separator === 'string' ? currentCharacter === separator : separator.test(currentCharacter)
    const isPreviousSeparator = typeof separator === 'string' ? previousCharacter === separator : separator.test(previousCharacter)
    const keepDoubleQuotes = isDoubleQuotes && ((currentCharacter === nextCharacter && currentCharacter !== nextTwoCharacter) || currentCharacter === previousCharacter)

    if (isDoubleQuotes && !keepDoubleQuotes) keepAsOneWord = !keepAsOneWord
    if ((isSeparator && !keepAsOneWord) || i + 1 === characters.length) {
      if (isPreviousSeparator) continue
      rows.push(tempWord)
      tempWord = ''
      continue
    }

    if (!isDoubleQuotes || (isDoubleQuotes && keepDoubleQuotes) || !removeExtraQuotes) tempWord += currentCharacter
  }

  return rows
}

export function ConvertCSVToObject(csvString: string) {
  if (!csvString) return []
  const csvRows = ConvertStringCSVToArray(csvString, /(?:\r\n|\r|\n)/)

  if (csvRows.length <= 1) return []

  const header = csvRows.shift()?.split(',')
  const result = csvRows.map((row) => {
    const rowData: string[] = ConvertStringCSVToArray(row, ',')
    return rowData.reduce((result: { [key: string]: unknown }, nextValue, currentIndex): { [key: string]: unknown } => {
      const currentHeader = header?.[currentIndex]
      const headerKeys = currentHeader?.split('.') || [String(currentIndex)]
      const currentHeaderKey = headerKeys[0]

      function mapArrayStringToNestedObject(keys: string[], value: unknown): { [key: string]: unknown } {
        if (!keys || keys.length === 0) return {}

        const copyOfKeys = [...keys]
        const currentKey = copyOfKeys.splice(0, 1)[0]
        const shouldReturn = Boolean(copyOfKeys.length === 0)
        return { [currentKey]: shouldReturn ? value : mapArrayStringToNestedObject(copyOfKeys, value) }
      }
      const resultObject = result?.[currentHeaderKey]
      const currentObject = mapArrayStringToNestedObject(headerKeys, nextValue.trim())[currentHeaderKey]
      const isValueObject = typeof currentObject === 'object'
      const isCurrentValueObject = typeof resultObject === 'object'

      return ({
        ...result,
        [currentHeaderKey]: (isValueObject && isCurrentValueObject) ? {
          ...resultObject,
          ...currentObject
        } : currentObject
        // [(header?.[currentIndex] || currentIndex)]: nextValue.trim(),
      })
    }, {})
  })

  return result
}

export function CSVReader(file: File) {
  return new Promise((resolve, reject) => {
    if (!file) reject('ERR: File is empty')
    const reader = new FileReader()
    reader.onload = async (readEvent) => {
      const content = readEvent.target?.result
      if (typeof content !== 'string') return

      const dataResult = await ConvertCSVToObject(content)
      resolve(dataResult)
    }
    reader.readAsText(file)
  })
}

const getObjectValueByHeader = <ObjectType extends { [x: string]: any }>(object: ObjectType, key: NestedKeyOf<ObjectType>) => {
  const objectKeys: string[] = key.split('.')

  if (objectKeys.length === 0) return object?.[objectKeys[0]]

  return objectKeys.reduce((result, currentKey) => {
    const value: any = result?.[currentKey]
    if (!Array.isArray(result)) return value
    return result.map((item) => item?.[currentKey])
  }, object)
}

export function ObjectToCSV<T extends { [key: string]: any }>(data: T[], header?: NestedKeyOf<T>[]): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(data)) reject('Err: cannot proccess the data')

    const headerList = header?.length ? header : Object.keys(data).join(',')

    const rows = data.reduce((result: any[], nextRow) => {
      if (header?.length) return [
        ...result,
        header.map((headerKey: string) => {
          const rowValue = getObjectValueByHeader<T>(nextRow, headerKey as unknown as NestedKeyOf<T>)

          if (Array.isArray(rowValue)) return `"${rowValue.join(',').replaceAll(`"`, `""`)}"`
          if (typeof rowValue === 'object') return `"${JSON.stringify(rowValue).replaceAll(`"`, `""`)}"`
          return `"${String(rowValue).replaceAll(`"`, `""`)}"`
        }).join(',')
      ]
      return [...result, Object.values(nextRow).map((value) => `"${typeof value === 'object' ? JSON.stringify(value).replaceAll(`"`, `""`) : `${value}`.replaceAll(`"`, `""`)}"`).join(',')]
    }, [])

    const csvContent = `${headerList}\n${rows.join('\n')}`
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })

    resolve(blob)
  })

}