export class User{
    static _tableName: string = "users";

    //model attributes
    id?: number;
    name: string;
    date_of_birth: string;
    email: string;
    gender : 'male' | 'female'
    hourly_rate: number;

}