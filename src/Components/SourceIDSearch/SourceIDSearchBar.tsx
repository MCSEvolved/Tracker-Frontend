import { useEffect, useRef, useState } from "react";
import { useComputers } from "../../Hooks/useComputers";
import useServices from "../../Hooks/useServices";
import useSystems from "../../Hooks/useSystems";
import SourceSearchResults from "./SourceSearchResults";
import { System } from "../../Types/System";
import { Computer } from "../../Types/Computer";
import { Service } from "../../Types/Service";

export default function SourceIDSearchBar() {
    const [systems, systemsLoading] = useSystems();
    const [computers, computersLoading] = useComputers();
    const [services, servicesLoading] = useServices();

    const [systemsToShow, setSystemsToShow] = useState<System[] | null>(null);
    const [computersToShow, setComputersToShow] = useState<Computer[] | null>(null);
    const [servicesToShow, setServicesToShow] = useState<Service[] | null>(null);

    const searchBarInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!searchBarInput.current) return;
        if (systemsLoading || computersLoading || servicesLoading) {
            searchBarInput.current.disabled = true;
            searchBarInput.current.placeholder = "Loading...";
            return;
        } else {
            searchBarInput.current.disabled = false;
            searchBarInput.current.placeholder = "Search for a sender...";
        }
    }, [systemsLoading, computersLoading, servicesLoading])
        
    
    const findInSystems = (searchString: string) => {
        if (!isNaN(Number(searchString))) {
            return systems.filter(system => system.id.toString().includes(searchString));
        }
        return systems.filter(system => 
            system.displayName.toLowerCase().includes(searchString.toLowerCase()));
    }  
        
    const findInComputers = (searchString: string) => {
        if (!isNaN(Number(searchString))) {
            return computers.filter(computer => computer.id.toString().includes(searchString));
        }
        return computers.filter(computer => 
            computer.label.toLowerCase().includes(searchString.toLowerCase()));
    }

    const findInServices = (searchString: string) => {
        return services.filter(service => 
            service.name.toLowerCase().includes(searchString.toLowerCase()));
    }

    const checkSearchStringForSpecification = (searchString: string) => {
        if (searchString === "") return false;
        if (searchString.startsWith("system:")) return true;
        if (searchString.startsWith("computer:")) return true;
        if (searchString.startsWith("service:")) return true;
        return false;
    }

    const setAllToShowNull = () => {
        setSystemsToShow(null);
        setComputersToShow(null);
        setServicesToShow(null);
    }

    const setAllToEmptyArray = () => {
        setSystemsToShow([]);
        setComputersToShow([]);
        setServicesToShow([]);
    }


    const handleInput = () => {
        if (!searchBarInput.current) return;
        const searchString = searchBarInput.current.value;

        if (searchString === "") {
            setAllToShowNull();
            return;
        }

        if (!checkSearchStringForSpecification(searchString)) {
            setSystemsToShow(findInSystems(searchString));
            setComputersToShow(findInComputers(searchString));
            setServicesToShow(findInServices(searchString));
            return;
        }

        const specification = searchString.split(":")[0];
        const searchQuery = searchString.split(":")[1];
        if (!searchQuery) {
            setAllToEmptyArray();
            return;
        }
        switch (specification) {
            case "system":
                setSystemsToShow(findInSystems(searchQuery));
                setComputersToShow(null);
                setServicesToShow(null);
                break;
            case "computer":
                setComputersToShow(findInComputers(searchQuery));
                setSystemsToShow(null);
                setServicesToShow(null);
                break;
            case "service":
                setServicesToShow(findInServices(searchQuery));
                setSystemsToShow(null);
                setComputersToShow(null);
                break;
            default:
                break;
        }
    }

    return (
        <div id="sourceIDSearch">
            <input
                ref={searchBarInput}
                type="text"
                placeholder="Search for a source..."
                className="w-52 h-8 rounded-md bg-MCS-Blue p-2 text-white"
                onChange={handleInput}
            />
            <SourceSearchResults 
                systemsToShow={systemsToShow} 
                computersToShow={computersToShow} 
                servicesToShow={servicesToShow}
                allSystems={systems}
            />
        </div>
    )
}