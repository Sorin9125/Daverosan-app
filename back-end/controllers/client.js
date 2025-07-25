const { clientModel } = require("../models");

const clientModel = {
    createClient: async(req, res) => {
        const client = req.body;
        if(!(client.name && client.phoneNumber && client.address && client.mail && client.site)) {
            return res.status(400).send("Completeaza toate campurile printule");
        }
        if(!(/^[A-z ]{3,}$/gm).test(client.name)) {
            return res.status(400).send("Numele trebuie sa contina doar litere si sa aiba cel putin 3 caractere");
        }
        if(!(/^[0-9]{10}$/gm).test(client.phoneNumber)) {
            return res.status(400).send("Numarul de telefon nu este valid");
        }
        if()
    }
}
