export class UsuarioModel {
    nombre: string;
    email: string;
    password: string;
    role?: string;
    img?: string;
    _id?: string;

    constructor(nombre, email, password, role?, img?, id?) {

        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.role = role;
        this.img = img;
        this._id = id;
    }
}