import { Log } from "../Types/Log";

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