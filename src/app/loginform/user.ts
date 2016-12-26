/**
 * Created by BernardKlatkaSquiz on 19/12/16.
 */
export class User {
    getPassword(){
        return this.password;
    }
  constructor(public username: string, private password: string, private email: string){}
}
