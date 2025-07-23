export class EntryModel {
    title: string = '';
    description?: string = '';
    times: EntryTimeModel[] = [];
}

export class EntryTimeModel {
    time: Date = new Date();
    type: 'start' | 'end' = 'start';
}