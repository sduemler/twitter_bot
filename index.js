const Twit = require('twit');
const T = new Twit({
    consumer_key:         'sAwyQZ1I3OdCnN11RsguKeJMV',
    consumer_secret:      'kRKPzdSaUQdu4QIwSu6BpkMN8f6puXdrIT64yw7Mrwd5jK3EYX',
    access_token:         '1118562073582215168-smr8jVI5cfHJF1LipDmOVLdNlsYeDb',
    access_token_secret:  'kbVMhiXVwUvSHGuY1OsCo87mh6sFaZrqwpO64b0OzGjTY',
});

exports.handler = (event, context, callback) => {
    T.post('statuses/update', {status: 'Song of the day!'}, function(err, data, response){
        console.log(data);
    })
};
