var mysql = require('mysql')

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'plato'
})

db.connect(err =>  { 
	if (err) {
		console.log('db error', err);
	} else {
		db.query('SELECT * FROM reviews', (err, results) => {
			if (err) {
				console.log('err in connect que', err) 
		    } else { 
		        var length = results.length; 
		        for (var i = 1; i < length + 1; i ++) {
		          db.query(`UPDATE reviews SET productID = ${Math.floor((Math.random() * 100) + 1)} WHERE ID = ${i}`, 
		          (err, results) => {
		          	err ? console.log(err) : console.log();
		          })
		        }
		    }
	    })  
	}
})

	//err ? console.log('db error', err) : console.log('db connected'));


var getAllReviews = (callback) => {
  db.query('SELECT * FROM reviews', (err, results) => {
    err ? callback(err) : callback(results);
  })
} 

var getProductReviews = (productID, callback) => {
  db.query(`SELECT * FROM reviews WHERE productID = ${productID}`, (err, results) => {
    err ? callback(err) : callback(results);
  })
  console.log(productID)
} 


module.exports = { db, getAllReviews, getProductReviews }
