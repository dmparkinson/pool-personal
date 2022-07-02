create database Informatica_Aplicada

use Informatica_Aplicada

create table Departamento(
id_departamento smallint identity(1,1) primary key,
nombre nvarchar(30),
eliminado bit
)

create table Sexo(
id_sexo tinyint identity(1,1) primary key,
descripcion nvarchar(30),
)


create table Funcionario(
id_funcionario smallint identity(1,1) primary key,
nombre nvarchar(30),
fecha_nacimiento date,
id_sexo tinyint,
foto nvarchar(100),
id_departamento smallint,
logname nvarchar(20),
contrase�a nvarchar(20),
eliminado bit

CONSTRAINT fk_id_sexo FOREIGN KEY (id_sexo)
REFERENCES Sexo (id_sexo),

CONSTRAINT fk_id_departamento FOREIGN KEY (id_departamento)
REFERENCES Departamento (id_departamento)
)

create table Transaccion(
id_transaccion tinyint identity(1,1) primary key,
descripcion nvarchar(30),

)

create table Solicitud(
id_solicitud smallint identity(1,1) primary key,
alias nvarchar(20),
fecha_hora smalldatetime,
id_usuario_aplicativo smallint,
id_responsable smallint,
id_responsable_usuario_final smallint,
fecha_inicio date,
fecha_fin date,
documento_acta_constitutiva nvarchar(100),
finalizado bit,
eliminado bit

CONSTRAINT fk_usuario_aplicativo FOREIGN KEY (id_usuario_aplicativo)
REFERENCES Funcionario (id_funcionario),

CONSTRAINT fk_id_responsable FOREIGN KEY (id_responsable)
REFERENCES Funcionario (id_funcionario),

CONSTRAINT fk_id_responsable_usuario_final FOREIGN KEY (id_responsable_usuario_final)
REFERENCES Funcionario (id_funcionario)

)

create table Trimestre(

id_trimestre tinyint identity(1,1) primary key,
descripcion nvarchar(30),

)

create table Avance(
id_avance smallint identity(1,1) primary key,
id_trimestre tinyint,
id_usuario_aplicativo smallint,
id_solicitud smallint,
documento nvarchar(100),
fecha_hora smalldatetime,
eliminado bit

CONSTRAINT fk_usuario_aplicativo_trimestre FOREIGN KEY (id_usuario_aplicativo)
REFERENCES Funcionario (id_funcionario),

CONSTRAINT fk_id_trimestre FOREIGN KEY (id_trimestre)
REFERENCES Trimestre (id_trimestre),

CONSTRAINT fk_id_solicitud_avance FOREIGN KEY (id_solicitud)
REFERENCES Solicitud (id_solicitud)
)

create table Bitacora_Auditoria(
id_bitacora_auditoria smallint identity(1,1) primary key,
id_transaccion tinyint,
id_usuario_aplicativo smallint,
id_solicitud smallint,
descripcion nvarchar (100) ,
fecha_hora smalldatetime,

CONSTRAINT fk_usuario_aplicativo_bitacora FOREIGN KEY (id_usuario_aplicativo)
REFERENCES Funcionario (id_funcionario),

CONSTRAINT fk_id_transaccion FOREIGN KEY (id_transaccion)
REFERENCES Transaccion (id_transaccion),

CONSTRAINT fk_id_solicitud_bitacora FOREIGN KEY (id_solicitud)
REFERENCES Solicitud (id_solicitud)
)



