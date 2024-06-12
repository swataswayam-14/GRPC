const protobuf = require('protobufjs');
const fs = require('fs');

protobuf.load('a.proto')
    .then(root => {
        const Person = root.lookupType('Person');

        const person = {name: "Swayam", age: 20};
        const buffer = Person.encode(person).finish();

        fs.writeFileSync('person.bin', buffer);
        console.log('Person serialized and saved to person.bin');

        const data = fs.readFileSync('person.bin');
        const deserializedPerson = Person.decode(data);

        console.log('Person deserialized from person.bin: ', deserializedPerson);
    }).catch(console.error);