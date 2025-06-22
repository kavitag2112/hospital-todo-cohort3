//--------------------------------------------------------
// get - users can check how many kidneys they have and thier health
//post - user can add a kidney
//put- user can repace a kidney,amke it healthy
//delete = user can remove a kidney

const express = require('express');
const app = express();

let users =[{
    name:"Jay",
    kidneys : [{
        healthy : false
    }],
}];


app.use(express.json());

let numberOfUnhealthyKidneys = 0;
// query parameter ?n=10
app.get('/',function(req,res){
    const johnKidney = users[0].kidneys;
    const numberOfKidneys = johnKidney.length;
    let numberOfHealthyKidneys = 0;
    for(let i=0; i<johnKidney.length; i++){
        if(johnKidney[i].healthy){
             numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }

     numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})


app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    });

    res.json({
        msg:'done bitch!!',
    });
})

app.put('/',function(req,res){
    for(let i =0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg : 'all kidney are healthy',
    });
})

app.delete('/',function(req,res){
    if(numberOfUnhealthyKidneys){
    const newKidneys = [];
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
                healthy : true,
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({
        msg : 'unheaelthy kidney removed!',
    });
    }
     else{
    //     res.sendStatus(411);
        res.status(411).json({
            msg:'no bad kidney!!',
        });
    }
    
})


function isThereAtleastUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i=0;i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}
app.listen(3000);