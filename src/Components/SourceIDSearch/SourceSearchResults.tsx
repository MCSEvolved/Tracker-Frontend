import { Computer } from "../../Types/Computer"
import { Service } from "../../Types/Service"
import { System } from "../../Types/System"
import SearchResult from "./SearchResult"

type Props = {
    systemsToShow: System[] | null
    computersToShow: Computer[] | null
    servicesToShow: Service[] | null
    allSystems: System[]
}

export default function SourceSearchResults({systemsToShow, computersToShow, servicesToShow, allSystems}: Props) {

    if (!systemsToShow && !computersToShow && !servicesToShow) return;

    if (systemsToShow && systemsToShow.length === 0 &&
        computersToShow && computersToShow.length === 0 &&
        servicesToShow && servicesToShow.length === 0) {
        return (
            <div id="sourceSearchResults">
                <p>No results found</p>
            </div>
        )
    }



    const getSystemName = (id: number) => {
        const system = allSystems.find(system => system.id === id);
        if (!system) return id.toString();
        return system.displayName;
    }

    return (
        <div id="sourceSearchResults">
            {systemsToShow && systemsToShow.map(system => <SearchResult 
                key={system.id}
                id={system.id.toString()}
                name={system.displayName}
            />)}
            {computersToShow && computersToShow.map(computer => <SearchResult
                key={computer.id}
                id={computer.id.toString()}
                name={computer.label}
                computerType={computer.device}
                parentSystem={getSystemName(computer.systemId)}
            />)}
            {servicesToShow && servicesToShow.map(service => <SearchResult
                key={service.id}
                id={service.id.toString()}
                name={service.name}
            />)}
        </div>

    )
}