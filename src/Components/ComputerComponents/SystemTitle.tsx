type Props = {
    systemName: string
}

export default function SystemTitle({ systemName }: Props) {
    return (
        <div id="systemTitle"
            className="absolute left-36 text-2xl"
            style={
                {
                    top: "120px",
                }
            }>
            <h1>{systemName}</h1>
        </div>
    )
}