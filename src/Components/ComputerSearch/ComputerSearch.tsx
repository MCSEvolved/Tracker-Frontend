import { useEffect, useRef, useState } from "react";
import { useComputers } from "../../Hooks/useComputers";
import { Computer } from "../../Types/Computer";
import ComputerSearchResults from "./ComputerSearchResults";

export default function ComputerSearch() {
    const [computers, computersLoading] = useComputers();

    const [computersToShow, setComputersToShow] = useState<Computer[] | null>(null);
    const [hideResults, setHideResults] = useState<boolean>(false);

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

    useEffect(() => {
        if (!hideResults || !searchBar.current) return;
        searchBar.current.value = "";
        setComputersToShow(null);
        searchBar.current.blur();
        setHideResults(false);
    }, [hideResults])

    const findInComputers = (searchTerm: string) => {
        //If the search term is a number
        if (!isNaN(Number(searchTerm))) {
            return computers.filter(computer => {
                return computer.id.toString().includes(searchTerm);
            });
        }

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
            <ComputerSearchResults computers={computersToShow} setHideResults={setHideResults} />
        </div>
    )   
}
