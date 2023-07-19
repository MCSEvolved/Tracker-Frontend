type Props = {
    name: string
    id: string
    computerType?: string
    parentSystem?: string
}

export default function SearchResultInfo({name, id, computerType, parentSystem}: Props) {
    return (
        <div id="searchResultInfo" className="flex flex-col">
            <p>{"Name: " + name}</p>
            <p>{"ID: " + id}</p>
            {computerType && <p>{"Type: " + computerType}</p>}
            {parentSystem && <p>{"System: " + parentSystem}</p>}
        </div>
    )
}