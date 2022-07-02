class Funcionario {

    constructor(nombre,sexo, logname, departamento,
        foto, fechaNacimiento,contrasenia, eliminado){
        this.nombre = nombre;
        this.logname = logname;
        this.departamento = departamento;
        this.foto =foto;
        this.fechaNacimiento = fechaNacimiento;
        this.contrasenia = contrasenia;
        this.eliminado = eliminado;
    }
}

module.exports.Funcionario = Funcionario
