export class Todo {
  constructor(public title?: string,
              public addeddate?: Date,
              public endeddate?: Date,
              public status?: boolean,
              public userid?: string,
  ) { }
}
