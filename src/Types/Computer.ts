export type Computer = {
    id: number;
    label: string;
    systemId: number;
    device: DeviceType;
    fuelLimit: number;
    fuelLevel: number;
    status: string;
    lastUpdate: number;
    hasModem: boolean;
    computerLocation?: ComputerLocation;
}

export type ComputerLocation = {
    computerId: number;
    coordinates: {
        x: number;
        y: number;
        z: number;
    }
    createdOn: number;
    dimension: Dimension;
}

export enum Dimension {
    Overworld = 'Overworld',
    Nether = 'Nether',
    End = 'End',
    Unknown = 'Unknown'
}

export enum DeviceType {
    INVALID = 'INVALID',
    Computer = 'Computer',
    Turtle = 'Turtle',
    Pocket_Computer = 'Pocket Computer',
    Advanced_Computer = 'Advanced Computer',
    Advanced_Turtle = 'Advanced Turtle',
    Advanced_Pocket_Computer = 'Advanced Pocket Computer'
}