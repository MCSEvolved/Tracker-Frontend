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