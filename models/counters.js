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
          callback(counter.seq);
        } else {
          new Counter({type: 'bookingid', seq: 1}).save();

          callback(1);
        }
    });
}

exports.resetCounter = function(callback){
  Counter.findOneAndUpdate({type: 'bookingid'}, { $set: { seq: 0 } }, function(){
    callback();
  })
}
