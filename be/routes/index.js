var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var singer_model = require("./../models/singer.model");
var video_model = require("./../models/video.model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/indexVideos", function (req, res, next) {
  var { num } = req.query;
  singer_model.aggregate(
    [
      {
        $project: {
          _id: {
            $convert: {
              input: "$_id",
              to: "string",
            },
          },
          singerImg: 1,
          singerName: 1,
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "singerId",
          as: "videos",
        },
      },
    ],
    function (err, doc) {
      var data = doc;
      if (num) {
        data.forEach((element) => {
          element.videos = element.videos.splice(0, num);
        });
      }
      return res.json({ code: 200, msg: "success", data });
    }
  );
});

router.get("/authVideos", function (req, res, next) {
  var { singerId } = req.query;
  video_model.find(
    {
      singerId,
    },
    function (err, doc) {
      return res.json({ code: 200, msg: "success", data: doc });
    }
  );
});

router.get("/singer", function (req, res, next) {
  var { singerId } = req.query;
  singer_model.aggregate(
    [
      {
        $match: {
          _id: mongoose.Types.ObjectId(singerId),
        },
      },
      {
        $project: {
          _id: {
            $convert: {
              input: "$_id",
              to: "string",
            },
          },
          singerImg: 1,
          singerName: 1,
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "singerId",
          as: "videos",
        },
      },
    ],
    function (err, doc) {
      return res.json({ code: 200, msg: "success", data: doc[0] });
    }
  );
});

module.exports = router;
