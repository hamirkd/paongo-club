import { Injectable } from '@angular/core';
import { User, USERDATA } from 'app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }
  user:User=new User();

  loginUserByLoginAndPassword(login:string,password:string):User{
    this.user= USERDATA.find(u=>u.login.includes(login.trim())&&u.password.includes(password.trim()));
  return this.user;
  }

  findUserByLogin(login:string):User{
    return USERDATA.find(u=>u.login.includes(login.trim()));
  }

  findUserById(id:string):User{
    return USERDATA.find(u=>u.id.includes(id.trim()));
  }

  addAccount(login:string,name:string,lastname:string,password:string,codeFather:string):User{
    const user:User=new User();
    const date:Date=new Date();
    user.id=date.getFullYear()+""+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes();
    USERDATA.push(user);
    return this.findUserByLogin(login);
  }

  enableUserAccount(idUser:string):boolean{
    const user:User=this.findUserById(idUser);
    if(!user) return false;
    user.status="ENABLE";
    USERDATA.splice(USERDATA.findIndex(u=>u.id==idUser),1);
    USERDATA.push(user);
    return true;
  }

  
}
