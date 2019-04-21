const Twit = require('twit');
const T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});
let track = "";
exports.handler = (event, context, callback) => {
    spotifyApi.clientCredentialsGrant().then(
        function(data) {
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.getPlaylist('6iluhHY58yxb1hzoHKyr8k')
                .then(function(data){
                    const playlist = data.body;
                    let random = Math.floor(Math.random() * playlist.tracks.items.length);;
                    let track_name = playlist.tracks.items[random].track.name + ' - ' + playlist.tracks.items[random].track.artists[0].name + ' ';
                    T.get('statuses/user_timeline', {user_id: '1118562073582215168'}, function(err, data, response){
                        let old_tweets = data;
                        let x = 0;
                        while(old_tweets[x].text.includes(track_name)) {
                            console.log('Already tweeted');
                            console.log(x);
                            random = Math.floor(Math.random() * playlist.tracks.items.length + 1);
                            track_name = playlist.tracks.items[random].track.name + ' - ' + playlist.tracks.items[random].track.artists[0].name + ' ';
                            x++;
                        }
                        track += track_name + playlist.tracks.items[random].track.external_urls['spotify'];
                        T.post('statuses/update', {status: track}, function(err, data, response){
                            console.log(data);
                        });
                        //console.log(track);
                    });
                }, function(err) {
                    console.log("Something went wrong: ", err);
                });
        },
        function(err){
            console.log('Something went wrong when retrieving the access token.', err);
        }
    );
};
