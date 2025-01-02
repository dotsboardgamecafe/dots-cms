'use client'

import { useCallback, useEffect, useMemo } from "react"

import { cn } from "@/lib/utils"

import { ProcesType, useProcessData } from "@/components/ui/Modal/processContext"
import Spiner from "@/components/ui/Spinner"
import Typography from "@/components/ui/Typography"

const ProcessItem: React.FC<ProcesType> = (process) => {
  const textColor = useMemo(() => {
    switch (process.status) {
      case 'completed': return 'text-blue-700'
      case 'failed': return 'text-error-700'
      default: return ''
    }
  }, [process.status])

  const statusBackground = useMemo(() => {
    switch (process.status) {
      case 'completed': return 'bg-blue-50'
      case 'failed': return 'bg-error-50'
      default: return ''
    }
  }, [process.status])

  return (
    <div key={process.title} className="flex flex-row items-center justify-between gap-5 w-full shadow-md border-slate-700 border py-2 px-6 bg-white">
      <Typography variant="paragraph-l-regular">{process.title}</Typography>
      {process.status === 'in-progress' && <Spiner className="!text-gray-400" />}
      {process.status !== 'in-progress' && <Typography variant="paragraph-l-medium" className={cn('py-[2px] px-[10px] rounded-2xl', statusBackground, textColor)}>{process.status}</Typography>}
    </div>
  )
}

export const ProcessModal = () => {
  const processes = useProcessData()

  const open = Boolean(processes.length)
  const isHaveInprogressProcess = processes.find((process) => process.status === 'in-progress')

  const askBeforeLeave = useCallback((event: BeforeUnloadEvent) => {
    event.preventDefault()
    return event.returnValue = ''
  }, [])

  useEffect(() => {
    if (!isHaveInprogressProcess) return
    window.addEventListener('beforeunload', askBeforeLeave, { capture: true })

    return () => window.removeEventListener('beforeunload', askBeforeLeave, { capture: true })
  }, [isHaveInprogressProcess, askBeforeLeave])

  if (!open) return null

  return (
    <div className="flex flex-col gap-2 fixed bottom-0 right-0 p-4">
      {processes.map((process) => <ProcessItem key={process.id} {...process} />)}
    </div>
  )
}