var Comment = require("../models/comment");

var commentsController = {

	index: function(req, res) {

		Comment.find({}, function(err, comments) {
      err ? 
      res.sendStatus(500) : res.status(200).send(JSON.stringify(comments));
      // res.status(200).send(JSON.stringify(places));
    });



    /* Find query of mongoose the find all the values of the collection; */
   //  Comment.find({}, function(err, docs) {
   //    if(err) returnError(err);
   //    /* For each element of docs, find the one with the same id of the postedby */
   //    docs.forEach(function(comment) {
   //      User.findOne({_id: comment.postedBy[0]}, function(err, user){
   //        comment.user = user;
   //      });
   //    });
   //    /* Getting the current user; */
   //    req.currentUser(function() {
   //      docs.forEach(function(comment) {

   //        if (req.user) {
   //        // console.log("posted by111•–•", typeof place.postedBy[0]);
   //        // console.log("req user •••••••••••••", req.user);
   //        // console.log("posted by222•-•", typeof req.user._id);
   //        var commentPostedBy = JSON.stringify(comment.postedBy[0]);
   //        var userId = JSON.stringify(req.user._id);
   //          if(commentPostedBy == userId) {
   //            comment.canDelete = true;
   //          } 
   //          else {
   //            comment.canDelete = false;
   //          }
   //        }
   //        // console.log("can delete?????:", place.canDelete);
   //      });
   //    });
   //    /* Sending value to the frontend page under the veterinary name*/
   //    res.render("index", {comment: docs});
	  // }).sort({createdAt: -1}); /* With .sort I am going to order the result of the find for the latest creater; */
  },

  /* create function called in the routes; */
  create: function(req, res) {
    console.log("req body 1111:", req.body);
    /* Create query of mongoose */
    Comment.create(req.body, function(err, comment) {
      // console.log("place----",place);
      // console.log("session user id----", req.session.userId);
      /* Pushing inside the array postedBy the user id; */
      comment.postedBy.push(req.session.userId);
      // console.log("place----after pushing",place);
      comment.save(function(err) {
        if (err) console.log("error: ",err);
      });
      /* if there there is an error: send status 500 and going to the fail function in the client side(app.js); else: send status 200 and going to the done function in the client side(app.js); */
      err ? 
      res.sendStatus(500) : res.sendStatus(200);
	    // console.log("req body 2222:", place);
	  });
  },


};


module.exports = commentsController;