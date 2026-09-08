'use client'

import { createContext, useCallback, useContext, useState } from "react"

import { actionProcessList } from "@/components/ui/Modal/dispatchAction"

export type ProcesType = {
  status: 'pending' | 'in-progress' | 'completed' | 'failed',
  title: string,
  id: string
  progress?: { current: number, total: number }
}

export type ProcessActionContext = { onProgress: (current: number, total: number) => void }
export type ProcessAction = (context?: ProcessActionContext) => Promise<unknown>

type ActionName = keyof (typeof actionProcessList)

export type ProcessDispatchActionType = {
  dispatchAction: (actionType: ActionName, config?: { title?: string, disableAutoClose?: boolean }) => void
  removeProcess: (processId: string) => void
}

const ProcessContext = createContext<ProcesType[]>([])
// eslint-disable-next-line @typescript-eslint/no-empty-function
const ProcessDispatchContext = createContext<ProcessDispatchActionType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatchAction: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeProcess: () => { }
})

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

  const dispatchAction = async (actionName: ActionName, config?: { title?: string, disableAutoClose?: boolean }) => {
    const id = addProcess({ status: 'in-progress', title: config?.title ?? `Exporting data ${actionName.split('_')[1]}` })
    const onProgress = (current: number, total: number) => editProcess(id, (prevData) => ({ ...prevData, progress: { current, total } }))
    try {
      await (actionProcessList[actionName] as ProcessAction)({ onProgress })
      editProcess(id, (prevData) => ({ ...prevData, status: 'completed' }))
    } catch (error) {
      editProcess(id, (prevData) => ({ ...prevData, status: 'failed' }))
    }

    if (config?.disableAutoClose) return
    setTimeout(() => removeProcess(id), 5000)
  }

  return (
    <ProcessContext.Provider value={processData}>
      <ProcessDispatchContext.Provider value={{ dispatchAction, removeProcess }}>
        {children}
      </ProcessDispatchContext.Provider>
    </ProcessContext.Provider>
  )

}