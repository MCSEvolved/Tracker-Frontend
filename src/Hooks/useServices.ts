import { useEffect, useState } from "react";
import { Service } from "../Types/Service";

export default function useServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [servicesLoading, setServicesLoading] = useState<boolean>(true);

    useEffect(() => {
        setServices([]);
        setServicesLoading(false);
    }, [])

    return [services, servicesLoading] as [Service[], boolean];
}