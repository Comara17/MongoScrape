var express = require("express");
var app = express();

app.get("/", function (req, res) {
    request("http://www.echojs.com/", function (error, response, html) {
        var $ = cheerio.load(html);
        $("article h2").each(function (i, element) {

            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            var entry = new Article(result);

            entry.save(function (err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }
            });

        });
    });
    res.send("Scrape Complete");
});

app.get("/articles", function (req, res) {
    Article.find({}, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    });
});

app.get("/articles/:id", function (req, res) {
    Article.findOne({
            "_id": req.params.id
        })
        .populate("note")
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.json(doc);
            }
        });
});


app.post("/articles/:id", function (req, res) {
    var newNote = new Note(req.body);

    newNote.save(function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Otherwise
        else {
            Article.findOneAndUpdate({
                    "_id": req.params.id
                }, {
                    "note": doc._id
                })
                .exec(function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(doc);
                    }
                });
        }
    });
});

app.post("/delete-articles/:id", function (req, res) {
    console.log(req.body);
    Note.remove({
        title: req.body.title,
        body: req.body.body
    }, function (err) {
        if (err)
            console.log(err);
        else {
            return res;
        }
    });
});

module.exports = app;