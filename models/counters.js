var mongoose = require('mongoose');

var CounterSchema = mongoose.Schema({
    type: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var Counter = mongoose.model('counter', CounterSchema);

exports.bumpId = function(doc, callback){
    Counter.findOneAndUpdate({type: 'bookingid'}, {$inc: { seq: 1} }, {new: true}, function(error, counter)   {
        if(error)
            return next(error);

        if(counter){
          doc.bookingid = counter.seq;
          callback();
        } else {
          new Counter({type: 'bookingid', seq: 1}).save();

          doc.bookingid = 1;
          callback();
        }          
    });
}