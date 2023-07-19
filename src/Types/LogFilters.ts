import { LogSource, LogType } from "./Log"

export interface LogFilters {
    types: LogType[]
    sources: LogSource[]
    startRange: Date | null
    endRange: Date | null
    sourceIds: string[]
    receiveLiveLogs: boolean
}