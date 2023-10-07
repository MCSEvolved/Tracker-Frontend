import { Tooltip } from "react-tooltip"
import { Log } from "../../../Types/Log"

type Props = {
    logs: Log[]
}

export default function ComputerPageLogRows({ logs }: Props) {
    if (logs.length === 0) return (
        <tr>
            <td colSpan={3} className="text-center">No logs found</td>
        </tr>
    )

    return logs.map((log) => {
        return (
            <tr key={log.id}>
                <td className="w-20"><p style={{ "color": log.getTypeColor() }}>{log.type}</p></td>

                <td className="w-20"
                    data-tooltip-id={"logTimeTooltip" + log.id}
                    data-tooltip-content={log.creationTime.toLocaleDateString('it-IT') + " " + log.creationTime.toLocaleTimeString('it-IT')}
                >{log.creationTime.toLocaleTimeString('it-IT')}</td>

                <td className="content-overflow">{log.content.toString()}</td>
                
                <Tooltip id={"logTimeTooltip" + log.id} />
            </tr>
        )
    })
}