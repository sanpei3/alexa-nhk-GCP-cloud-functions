'use strict';

const rp = require("request-promise");
var to_json = require('xmljson').to_json;

const reply_message = (res) => {
    var title = "08月08日 夜7時NHKきょうのニュース";
    var pubDate = "Wed, 08 Aug 2018 19:42:58 +0900";
    var url = "https://www9.nhk.or.jp/r-news/podcast/mp3/20180809190003_16263_1_1_2.mp3";
    var length ="16683940";

    var message = "<rss version=\"2.0\"><channel><ttl>30</ttl><item><guid>urn:uuid:1335c695-cfb8-4ebb-abbd-80da344efa6b</guid><title>%%TITLE%%</title><description></description><link>https://www.nhk.or.jp/podcasts/program/r-news.html</link><pubDate>%%PUBDATE%%</pubDate><enclosure url=\"%%URL%%\" length=\"%%LENGTH%%\" type=\"audio/mpeg\"/></item></channel></rss>"

    var options = {
        method: 'GET',
	uri: "https://www.nhk.or.jp/r-news/podcast/nhkradionews.xml",
    };
    
    rp(options).then((response) => {
	to_json(response, function (error, data) {
	    for(let i in data.rss.channel.item) {
		var item = data.rss.channel.item[i]
		length = item.enclosure['$'].length;
		if (length > 6700000) {
		//if (length > 16000000) {
		    title = item.title;
		    pubDate = item.pubDate;
		    url = item.enclosure['$'].url.replace("http:", "https:");
		    break
		}
	    };
	});
	message = message.replace("%%TITLE%%", title);
	message = message.replace("%%PUBDATE%%", pubDate);
	message = message.replace("%%URL%%", url);
	message = message.replace("%%LENGTH%%", length);
	res.send(message);
    }, (error) => {
	console.log("ERROR");
	console.log(response);
	console.log(error);
	res.send("ERROR");
    });
    
};

exports.nhk_news_alexa = function nhk_news_alexa (req, res) {
    reply_message(res);
};
//let c;
//reply_message(c);
