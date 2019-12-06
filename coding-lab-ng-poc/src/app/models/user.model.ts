export class User{
    static _tableName: string = "users";

    //model attributes
    id?: number;
    name: string;
    date_of_birth: string;
    email: string;
    gender : 'male' | 'female'
    hourly_rate: number;

    constructor($id: number, name: string, email: string, gender: 'male' | 'female', hourly_rate: number, birth_date: string){
        this.id = $id
        this.name = name
        this.email = email
        this.gender = gender
        this.hourly_rate = hourly_rate
        this.date_of_birth = birth_date
    }

}