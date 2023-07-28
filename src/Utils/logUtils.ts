import { Log } from "../Types/Log";
import { LogFilters } from "../Types/LogFilters";

export function mapLog(logResponse: any) {
    return new Log(
        logResponse.id,
        logResponse.type,
        logResponse.content,
        new Date(logResponse.creationTime),
        logResponse.metaData,
        logResponse.sourceId,
        logResponse.source
    )
}

export function mapLogs(logResponse: object[]) {
    let newLogs: Log[] = logResponse.map((log: any) =>
        mapLog(log)
    )
    return newLogs;
}

export function checkIfLogMatchesFilters(log: Log, logFilters: LogFilters) {
    if (!logFilters.types.includes(log.type)) return false;
    if (!logFilters.sources.includes(log.source)) return false;
    if (logFilters.sourceIds.length > 0 && !logFilters.sourceIds.includes(log.sourceId)) return false;
    return true;
}