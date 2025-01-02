'use client'

import { createContext, useCallback, useContext, useState } from "react"

import { actionProcessList } from "@/components/ui/Modal/dispatchAction"

export type ProcesType = {
  status: 'pending' | 'in-progress' | 'completed' | 'failed',
  title: string,
  id: string
}

type ActionName = keyof (typeof actionProcessList)

export type ProcessDispatchActionType = (actionType: ActionName) => void

const ProcessContext = createContext<ProcesType[]>([])
// eslint-disable-next-line @typescript-eslint/no-empty-function
const ProcessDispatchContext = createContext<ProcessDispatchActionType>(() => { })

export const useProcessData = () => useContext(ProcessContext)
export const useProcessDispatch = () => useContext(ProcessDispatchContext)

export const ProcessContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [process, setProcess] = useState<{ [key: string]: ProcesType }>({})

  const processData = Object.values(process)

  const addProcess = useCallback((data: Omit<ProcesType, 'id'>): string => {
    if (!data) return ''
    const uid = Date.now().toString()
    setProcess((previousProcesses) => ({ ...previousProcesses, [uid]: { ...data, id: uid } }))
    return uid
  }, [])

  const editProcess = useCallback((key: string, data: Omit<ProcesType, 'id'> | ((prevData: Omit<ProcesType, 'id'>) => Omit<ProcesType, 'id'>)) => {
    if (!key || !data) return

    setProcess((prevProcess) => {
      const prevValue = prevProcess[key]
      const value = typeof data === 'function' ? data?.(prevValue) : data
      if (!prevValue || !value) return ({ ...prevProcess })
      return ({ ...prevProcess, [key]: { ...prevValue, ...value } })
    })
  }, [])

  const removeProcess = useCallback((key: string) => {
    if (!key) return null

    setProcess((prevProcess) => {
      const newProcess = { ...prevProcess }
      delete newProcess[key]
      return newProcess
    })
  }, [])

  const dispatchAction = async (actionName: ActionName) => {
    const id = addProcess({ status: 'in-progress', title: `Exporting data ${actionName.split('_')[1]}` })
    try {
      await actionProcessList[actionName]()
      editProcess(id, (prevData) => ({ ...prevData, status: 'completed' }))
    } catch (error) {
      editProcess(id, (prevData) => ({ ...prevData, status: 'failed' }))
    }

    setTimeout(() => removeProcess(id), 5000)
  }

  return (
    <ProcessContext.Provider value={processData}>
      <ProcessDispatchContext.Provider value={dispatchAction}>
        {children}
      </ProcessDispatchContext.Provider>
    </ProcessContext.Provider>
  )

}