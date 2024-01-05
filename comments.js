// Create web server to handle comments

// Required modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// Create express app
var app = express();

// Use body-parser to parse JSON
app.use(bodyParser.json());

// Create route to handle GET requests at /comments
app.get('/comments', function (req, res) {
    // Read comments.json file
    fs.readFile('comments.json', function (err, data) {
        // Check for errors
        if (err) {
            console.error(err);
            process.exit(1);
        }

        // Send comments to user
        res.send(JSON.parse(data));
    });
});

// Create route to handle POST requests at /comments
app.post('/comments', function (req, res) {
    // Read comments.json file
    fs.readFile('comments.json', function (err, data) {
        // Check for errors
        if (err) {
            console.error(err);
            process.exit(1);
        }

        // Parse JSON into object
        var comments = JSON.parse(data);

        // Add new comment to object
        comments.push(req.body);

        // Write object back to file
        fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function (err) {
            // Check for errors
            if (err) {
                console.error(err);
                process.exit(1);
            }

            // Send comments to user
            res.send(comments);
        });
    });
});

// Start server
app.listen(3000, function () {
    console.log('Server listening on port 3000...');
});
 
