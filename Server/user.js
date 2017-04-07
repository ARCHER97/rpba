
var express = require('express'),
    router = express.Router() 
//good work!! 21.02.2017 11:06
router.post('/auth', function(req, res) { 
    connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            console.log("registration ID: " + req.body.id); 
            connection.query('SELECT * from users WHERE id = ?', req.body.id, function(err, rows, records) { 
                if (err) 
                    throw err;
                console.log("Registration...");
                if(rows.length == 0){ 
                    console.log("Insert new user with login: " + req.body.login) 
                    var post = {id: req.body.id, login: req.body.login} 
                    connection.query('INSERT INTO users SET ?', post, function(err, result) { 
                        if (err) 
                            throw err;
                    }); 
                    connection.query('INSERT INTO users_category SET id_user=?, email=?', 
                        [req.body.id,req.body.login], function(err, result) { 
                        if (err) 
                            throw err;
                    });          
                }
                res.send(JSON.stringify(!rows.length)); 

                connection.release();
            }); 
        } 
    }); 
}); 
//good work!! 21.02.2017 16:43
router.post('/getcategories', function(req, res) { 

     connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else { 
            connection.query('SELECT category from users_category WHERE id_user = ?', req.body.id, function(err, rows, records) { 
                if (err) 
                    throw err; 
                let state = false;
                res.send(JSON.stringify(rows)); 
                
                connection.release();
            }); 
        } 
    }); 
    
}); 
//good work!! 21.02.2017 16:28
router.post('/addcategory', function(req, res) { 
     connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            var post = {id_user: req.body.id , category: req.body.category}; 
            console.log(post);    
            connection.query('INSERT INTO users_category SET ?', post, function(err, result) { 
                if (err) throw err; 
                res.send(JSON.stringify(result)); 
                connection.release();
            });
        } 
    }); 
    
}); 
//good work!! 21.02.2017 16:28
router.post('/deletecategory', function(req, res) { 
     connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            connection.query('DELETE FROM users_category WHERE id_user=? AND category=?',
                                                [req.body.id ,req.body.category], function(err, result) { 
                if (err) throw err; 
                res.send(JSON.stringify(result)); 
                connection.release();
            });
        } 
    }); 
    
}); 

module.exports = router