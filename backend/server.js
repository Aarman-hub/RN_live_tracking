require('dotenv').config();
const express = require('express');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 8000

const server = app.listen(port, ()=>{
   console.log(`Listining on ${port}`); 
});

const socketHandler = socketIo(server);


socketHandler.on("connection", (socket)=>{
    socket.on('connect_error',()=>{
        console.log('Connection Error');
    });
    socket.on("disconnect", ()=>{
        console.log("Disconnected");
    });
    console.log("Client conected")
    socket.emit("crypto","Hello Crypto")
});

const getPrice = () => axios.get(process.env.CRYPTO_URL, {
        headers:{
            "x-messari-api-key":process.env.API_KEY
        }
  })
    .then(response =>{
        const priceList = response.data.data.map(item=>{
            return {
                id: item.id,
                slug: item.slug,
                price: item.metrics.market_data.price_usd
            }
        })
        socketHandler.emit("crypto", priceList);
    }
    ).catch(err=>{
        socketHandler.emit("crypto",{
            error: true,
            message: "Error from Api"
        })
    });


setInterval(() => {
    getPrice();
}, 5000);

app.get('/cryptos/profile',(req, res)=>{
    res.json({error:true, message:"Missing crypto id in url"});
});

app.get('/cryptos/profile/:id',(req, res)=>{
    const cryptosId = req.params.id;

    axios.get(`${process.env.BASE_URL_V2}/${cryptosId}/profile`,{
            headers:{
                "x-messari-api-key":process.env.API_KEY
            }
         })
         .then(resData => res.json(resData.data))
         .catch((err)=>{
            res.json({
                error:true,
                message:'Error fetching data from api',
                errorDetails:err
            })
         });
});


app.get('/cryptos/market-data',(req, res)=>{
    res.json({error:true, message:"Missing crypto id in url"});
});

app.get('/cryptos/market-data/:id',(req, res)=>{
    const cryptosId = req.params.id;

    axios.get(`${process.env.BASE_URL_V1}/${cryptosId}/metrics/market-data`,{
            headers:{
                "x-messari-api-key":process.env.API_KEY
            }
         })
         .then(resData => res.json(resData.data))
         .catch((err)=>{
            res.json({
                error:true,
                message:'Error fetching data from api',
                errorDetails:err
            })
         });
});