import { Log } from "../../Types/Log"
import "../../Styles/LogTable.css"
import useLogs from "../../Hooks/useLogs";
import { mapLog } from "../../Utils/logUtils";
import { useEffect } from "react";
import { connectionContext } from "../../Contexts/ConnectionContext";
import { useContext } from "react";

export default function LogTable() {

    function createRow(log: Log) {
        const row = document.createElement("tr");
        const typeCell = document.createElement("td");
        const senderCell = document.createElement("td");
        const contentCell = document.createElement("td");
        const timeCell = document.createElement("td");
        const typeCellText = document.createElement("p");
        
        typeCellText.innerText = log.type;
        typeCellText.style.color = log.getTypeColor();
        
        typeCell.appendChild(typeCellText);
        typeCell.className = "w-20";
        
        senderCell.innerText = log.getSenderDisplayName();
        senderCell.className = "w-40";
        
        contentCell.innerText = log.content;
        contentCell.className = "content-overflow";
        
        timeCell.innerText = log.creationTime.toLocaleTimeString('it-IT');
        timeCell.className = "w-20 text-center";
        
        row.appendChild(typeCell);
        row.appendChild(senderCell);
        row.appendChild(contentCell);
        row.appendChild(timeCell);
        
        return row;
    }

    const [logs, logsLoading] = useLogs();

    const { connection } = useContext(connectionContext);
    
    useEffect(() => {
        if (!connection) return;

        connection.on("NewMessage", (data: any) => {
            console.log("Received new log")
            const log = mapLog(data);

            const tableRow = createRow(log);

            const logTable = document.getElementById("logTable");
            if (!logTable) return;
            logTable.insertBefore(tableRow, logTable.firstChild);
        })

        return () => {
            connection.off("NewMessage");
        }
    }, [connection])

    if (logsLoading) return <p>Loading logs...</p>

    return (
        <div className="flex justify-center"> 
            <table id="logTable" className="w-full m-8 table-fixed">
                <thead>
                    <tr>
                        <th className="w-20">Type</th>
                        <th className="w-40">Sender</th>
                        <th>Content</th>
                        <th className="w-20">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td className="w-20"><p style={{ "color": log.getTypeColor()}}>{log.type}</p></td>
                            <td className="w-40">{log.getSenderDisplayName()}</td>
                            <td className="content-overflow">{log.content}</td>
                            <td className="w-20 text-center">{log.creationTime.toLocaleTimeString('it-IT')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}