export class StaffCreateDto{
    id : number;
    username : string;
    password : string;
    name : string;
    birthday : string;
    card : string;
    wardId : number;
    gender : string;
    email : string;
    phone : string;
    imageURL : string;

    constructor(id : number , username: string, password: string, name: string, birthday: string, card: string ,  wardId : number ,  gender: string, email: string, phone : string ,  imageURL: string) {
       this.id = id;
        this.username = username;
       this.password = password;
       this.name = name;
       this.birthday = birthday;
       this.card = card;
       this.wardId = wardId;
       this.gender = gender;
       this.email = email;
       this.phone = phone;
       this.imageURL = imageURL;
      }
      
}