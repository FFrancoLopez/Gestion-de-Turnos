"use strict";
// Realizar pruebas de variables, objetos, funciones
// const num1: number = 5;
// const num2: number = 10;
// function sumar (a:number, b:number) :number  {
//     return a + b
// };
// console.log(sumar(num1,num2));
// ARRAY de tipos: 
// const num: number = 10;
// const str: string = "hola";
// const act: boolean = true;
// const arr = [num, str, act];
// console.log(arr);
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["GUEST"] = "guest";
})(UserRole || (UserRole = {}));
const user1 = {
    credential: {
        id: 100,
        nameUser: "franco007"
    },
    name: "franco",
    age: 26,
    email: "franco@gmail.com",
    turno: {
        title: "Corte de pelo",
        isActive: true
    },
    role: UserRole.ADMIN
};
console.log(user1);
