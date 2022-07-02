 class Solicitud {

    constructor(responsable, usuarioAplicativo, fechaInicio,
        fechaFin, documento, fecha, eliminado, responsableUsuarioFinal){

        this.responsable = responsable;
        this.usuarioAplicativo = usuarioAplicativo;
        this.documento =documento;
        this.fecha = fecha;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.responsableUsuarioFinal = responsableUsuarioFinal;
    }
}

module.exports.Solicitud = Solicitud;


