export class Log {
    id: string;
    type: LogType;
    content: string;
    creationTime: Date;
    metaData: object;
    sourceId: string;
    source: LogSource;

    constructor(id: string, type: LogType, content: string, creationTime: Date, metaData: object, sourceId: string, source: LogSource) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.creationTime = creationTime;
        this.metaData = metaData;
        this.sourceId = sourceId;
        this.source = source;
    }

    public getTypeColor() {
        switch (this.type) {
            case LogType.Error:
                return 'red';
            case LogType.Warning:
                return 'orange';
            case LogType.Info:
                return 'green';
            case LogType.Debug:
                return 'gray';
            case LogType['Out of Fuel']:
                return 'red';
        }
    }

    public getSenderDisplayName() {
        if (this.source === LogSource.Computer) {
            return 'Computer'
        } else if (this.source === LogSource.Pocket) {
            return 'Pocket Computer'
        } else if (this.source === LogSource.Turtle) {
            return 'Turtle'
        } else if (this.source === LogSource.System) {
            return this.sourceId;
        } else if (this.source === LogSource.Service) {
            return this.sourceId;
        }
        else {
            return 'Name not found'
        }
    }
}

export enum LogType {
    'Error' = 'Error',
    'Warning' = 'Warning',
    'Info' = 'Info',
    'Debug' = 'Debug',
    'Out of Fuel' = 'Out of Fuel',
}

export enum LogSource {
    'Service' = 'Service',
    'Computer' = 'Computer',
    'System' = 'System',
    'Turtle' = 'Turtle',
    'Pocket' = 'Pocket',
}