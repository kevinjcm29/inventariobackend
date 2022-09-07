const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect('mongodb+srv://kevin:aleida22@kev01.c5jgwia.mongodb.net/kev01')
let port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Server started on' + port)
})
