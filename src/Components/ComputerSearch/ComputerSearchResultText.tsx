import { DeviceType } from "../../Types/Computer"

type Props = {
    label: string,
    deviceType: DeviceType,
    id: number,
}

export default function ComputerSearchResultText({ label, deviceType, id }: Props) {
    return (
        <div id="computerDisplayInfo" className="block text-sm">
            <p>{label}</p>
            <p className="text-xs">Type: {deviceType}</p>
            <p className="text-xs">ID: {id}</p>
        </div>
    )
}