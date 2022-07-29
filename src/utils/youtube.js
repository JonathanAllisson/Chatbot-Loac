import axios from 'axios';

const KEY = process.env.YOUTUBE_KEY;

const conex =  axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY,
    }
})

export const queryVideos = async query => {

    let videos;

    try{
        const vyt = await conex.get('/search', {
            params: {
                q: query
            }
        })

        videos = vyt.data.items.map( i => (
            {
                "structValue":{
                "fields":{
                    "description":{
                        "stringValue": i.snippet.title,
                        "kind":"stringValue"
                    },
                    "button":{
                        "structValue":{
                            "fields":{
                            "payload":{
                                "stringValue": "https://youtu.be/"+ i.id.videoId,
                                "kind":"stringValue"
                            },
                            "link":{
                                "boolValue":true,
                                "kind":"boolValue"
                            }
                            }
                        },
                        "kind":"structValue"
                    },
                    "header":{
                        "stringValue": i.snippet.title,
                        "kind":"stringValue"
                    },
                    "image":{
                        "stringValue": i.snippet.thumbnails.medium.url,
                        "kind":"stringValue"
                    }
                }
                },
                "kind":"structValue"
            }
        ));

    }catch(err){
        console.log('erro!!!!!');
    }

    return videos;

}