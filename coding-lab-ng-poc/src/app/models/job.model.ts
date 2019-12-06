export class Job{
    static _tableName: string = "jobs";
    // model attributes
    $id: number;
    title: string;
    description: string;

    constructor($id: number, title: string, description: string){        
        this.$id = $id;
        this.title = title;
        this.description = description;
    }

}