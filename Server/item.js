const nodemailer = require('nodemailer');

var express = require('express'),
    router = express.Router() 

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arturkulik70@gmail.com',
        pass: 'serafim1997'
    }
});

router.get('/getitems', function(req, res) { 
     connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            connection.query('SELECT * FROM items', function(err, rows) { 
                if (err) throw err; 
                res.send(JSON.stringify(rows)); 
                connection.release();
            });
        } 
    }); 
});

router.get('/getitem', function(req, res) { 
     connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            connection.query('SELECT * FROM items Where id=?', req.query.id, function(err, rows) { 
                if (err) throw err; 
                res.send(JSON.stringify(rows)); 
                connection.release();
            });
        } 
    }); 
});

router.post('/getitemswithcategory', function(req, res) { 
     connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            var post = { category: req.body.category }; 
            console.log(post);    
            connection.query('SELECT * FROM items WHERE ?', post, function(err, result) { 
                if (err) throw err; 
                res.send(JSON.stringify(result)); 
                connection.release();
            });
        } 
    }); 
    
});  
 
router.post('/additem', function(req, res) { 
     connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            var post = { category: req.body.category, user_id: req.body.user_id,
                 name: req.body.name, about: req.body.about, price: req.body.price}; 
            console.log(post);    
            connection.query('INSERT INTO items SET ?', post, function(err, result) { 
                if (err) throw err; 
                res.send(JSON.stringify(result)); 
                sendmessagetomail("We have a new item: "+req.body.name, req.body.category)
                connection.release();
            });
        } 
    }); 
    
}); 

router.post('/deleteitem', function(req, res) { 
     connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            connection.query('DELETE FROM items WHERE id=?', req.body.id, function(err, result) { 
                if (err) throw err; 
                res.send(JSON.stringify(result)); 
                connection.release();
            });
        } 
    }); 
    
});

function sendmessagetomail(message, category){
    connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
        } else {
            connection.query('SELECT * FROM users_category', function(err, rows) { 
                if (err) throw err;
                for (var i in rows) {
                    if(JSON.parse(rows[i].body).indexOf(category)!=-1){
                        console.log(message + rows[i].email)
                        let mailOptions = {
                            from: '"Shop 👻" <arturkulik70@gmail.com>', // sender address
                            to: rows[i].email, // list of receivers
                            subject: 'Hello ✔', // Subject line
                            text: message, // plain text body
                            html: message // html body
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message %s sent: %s', info.messageId, info.response);
                        });
                    }
                }
                connection.release();
            });
        } 
    }); 
}

module.exports = router
