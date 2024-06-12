import path from 'path';
import * as grpc from '@grpc/grpc-js';
import { GrpcObject, ServiceClientConstructor } from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefination = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));

const personProto = grpc.loadPackageDefinition(packageDefination);

const PERSONS = [
    {
        name: "swayam",
        age: 20
    },
    {
        name: "friends",
        age: 20
    },
];

//@ts-ignore

function addPerson(call, callBack){
    console.log(call);

    let person = {
        name: call.request.name,
        age: call.request.age 
    }
    PERSONS.push(person);
    callBack(null, person);
}

const server = new grpc.Server();

server.addService((personProto.AddressBookService as ServiceClientConstructor).service, { addPerson: addPerson });

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});