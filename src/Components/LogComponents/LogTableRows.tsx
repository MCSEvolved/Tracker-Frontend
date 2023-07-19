import { Log } from "../../Types/Log";

type Props = {
    logs: Log[]
}

export default function LogTableRows({ logs }: Props) {
    return logs.map((log, index) => {
        return (
            <tr key={log.id}>
                <td className="w-20"><p style={{ "color": log.getTypeColor() }}>{log.type}</p></td>
                <td className="w-20">{log.creationTime.toLocaleTimeString('it-IT')}</td>
                <td className="w-40">{log.getSenderDisplayName()}</td>
                <td className="content-overflow">{log.content.toString()}</td>
            </tr>
        )
    })
}