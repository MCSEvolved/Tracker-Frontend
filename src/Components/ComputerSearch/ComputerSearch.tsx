import { useEffect, useRef, useState } from "react";
import { useComputers } from "../../Hooks/useComputers";
import { Computer } from "../../Types/Computer";
import ComputerSearchResults from "./ComputerSearchResults";

export default function ComputerSearch() {
    const [computers, computersLoading] = useComputers();

    const [computersToShow, setComputersToShow] = useState<Computer[] | null>(null);

    const searchBar = useRef<HTMLInputElement>(null); 
    if (searchBar.current) searchBar.current.focus();

    useEffect(() => {
        if (computersLoading && searchBar.current) {
            searchBar.current.placeholder = "Loading...";
            searchBar.current.disabled = true;
        } 
        else if (searchBar.current) {
            searchBar.current.placeholder = "Search for a computer...";
            searchBar.current.disabled = false;
        }
    }, [computersLoading])

    const findInComputers = (searchTerm: string) => {
        return computers.filter(computer => {
            return computer.label.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

    const handleInput = () => {
        if (!searchBar.current) return;
        const searchTerm = searchBar.current.value.trim();
        if (searchTerm === "") {
            setComputersToShow(null)
            return;
        }
        const foundComputers = findInComputers(searchTerm);
        setComputersToShow(foundComputers);
    }

    return (
        <div id="computerSearch" className="flex items-center flex-col">
            <input  
                ref={searchBar} 
                className="w-72 h-8 rounded-lg bg-MCS-grey px-2 text-MCS-Black focus:outline-none" 
                type="text" 
                placeholder="Search for a computer..."
                onChange={handleInput}
            />
            <ComputerSearchResults computers={computersToShow} />
        </div>
    )   
}
