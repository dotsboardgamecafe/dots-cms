
export function ConvertCSVToObject(csvString: string) {
  if (!csvString) return []
  const csvRows = csvString.split(/(?:\r\n|\r|\n)/g)

  if (csvRows.length <= 1) return []

  const header = csvRows.shift()?.split(',')

  const result = csvRows.map((row) => {
    const rowData = row.split(',')
    return rowData.reduce((result, nextValue, currentIndex) => {
      return ({
        ...result,
        [(header?.[currentIndex] || currentIndex)]: nextValue.trim(),
      })
    }, {})
  })

  return result
}

export function CSVReader(file: File) {
  if (!file) return []

  return new Promise((resolve) => {
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

export function ObjectToCSV(data: { [x: string]: any }[], header?: string[]): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(data)) reject('Err: cannot proccess the data')

    const headerList = header?.length ? header : Object.keys(data).join(',')

    const rows = data.reduce((result: any[], nextRow) => {
      if (header?.length) return [...result, header.map((headerKey) => `"${typeof nextRow[headerKey] === 'object' ? JSON.stringify(nextRow[headerKey]).replaceAll(`"`, `""`) : `${nextRow[headerKey]}`.replaceAll(`"`, `""`)}"`).join(',')]
      return [...result, Object.values(nextRow).map((value) => `"${typeof value === 'object' ? JSON.stringify(value).replaceAll(`"`, `""`) : `${value}`.replaceAll(`"`, `""`)}"`).join(',')]
    }, [])

    const csvContent = `${headerList}\n${rows.join('\n')}`
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })

    resolve(blob)
  })

}