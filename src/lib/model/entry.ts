export class EntryModel {
    title: string = '';
    description?: string = '';
    times: EntryTimeModel[] = [];
    estimtaedTime?: number = -1;
}

export class EntryTimeModel {
    time: Date = new Date();
    type: 'start' | 'end' = 'start';
}