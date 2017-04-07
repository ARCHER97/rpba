var express = require('express'),
    router = express.Router() 
    
router.post('/update', function(req, res) { 
       connectionpool.getConnection(function(err, connection) { 
        if (err) { 
            console.error('CONNECTION error: ',err); 
            res.statusCode = 503; 
            res.send({ 
                result: 'error', 
                err: err.code 
            }); 
        } else {
            connection.query('UPDATE users_category SET body=? WHERE id_user=?', 
                    [req.body.val,req.body.id], function(err, result) { 
                if (err) throw err;
                res.send(JSON.stringify(result)); 
                connection.release();
            });
        } 
    });  
});
 
module.exports = router