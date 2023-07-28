import { Log } from "../../../Types/Log"

type Props = {
    logs: Log[]
}

export default function ComputerPageLogRows({ logs }: Props) {
    return logs.map((log) => {
        return (
            <tr key={log.id}>
                <td className="w-20"><p style={{ "color": log.getTypeColor() }}>{log.type}</p></td>
                <td className="w-20">{log.creationTime.toLocaleTimeString('it-IT')}</td>
                <td className="content-overflow">{log.content.toString()}</td>
            </tr>
        )
    })
}