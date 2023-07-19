import SearchResultInfo from "./SearchResultInfo"

type Props = {
    name: string
    id: string
    computerType?: string
    parentSystem?: string
    iconURL?: string
}

export default function SearchResult ({name, id, computerType, parentSystem, iconURL}: Props) {
    return (
        <div>
            <div id="icon">
                <img src={iconURL}></img>
            </div>
            <SearchResultInfo name={name} id={id} computerType={computerType} parentSystem={parentSystem}/>
        </div>
    )
}