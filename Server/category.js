var express = require('express'),
    router = express.Router() 
//good work!! 21.02.2017 16.51
router.get('/getcategories', function(req, res) { 
     connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            connection.query('SELECT * FROM category', function(err, rows) { 
                if (err) throw err; 
                res.send(JSON.stringify(rows)); 
                connection.release();
            });
        } 
    }); 
}); 

router.post('/getmycategories', function(req, res) { 
       connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            connection.query('SELECT * FROM users_category WHERE id_user=?', req.body.id, function(err, result) { 
                if (err) throw err;
                res.send(JSON.stringify(result)); 
                connection.release();
            });
        } 
    });  
});

router.post('/setmycategories', function(req, res) { 
       connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            connection.query(
                'UPDATE users_category SET body = ? WHERE id_user=?', 
                    [req.body.categories, req.body.id], function(err, result) { 
                if (err) throw err;
                res.send(JSON.stringify(result)); 
                connection.release();
            });
        } 
    });  
});

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
            var post = { category: req.body.category }; 
            connection.query('INSERT INTO category SET ?', post, function(err, result) { 
                if (err) throw err; 
                res.send(JSON.stringify(result)); 
                connection.release();
            });
        } 
    }); 
    
}); 

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
            connection.query('DELETE FROM category WHERE category=?', req.body.category, function(err, result) { 
                if (err) throw err; 
                res.send(JSON.stringify(result)); 
                connection.release();
            });
        } 
    }); 
    
}); 
module.exports = router