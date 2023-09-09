const axios = require('axios').default;


const connectToURL = (url)=>{
    const req = axios.get(url);
    console.log(req);
    req.then(resp => {
        console.log('\n\n')
        console.log(resp.data);
        console.log('\n\n')
    })
    .catch(err => {
        console.log("Rejected for url "+url)
        console.log(err.toString())
    });
}


connectToURL('http://localhost:8080/')

connectToURL('http://localhost:8080/isbn/1249')
connectToURL('http://localhost:8080/author/Hans Christian Andersen')
connectToURL('http://localhost:8080/title/The Book Of Job')
