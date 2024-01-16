const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main()
.then(()=>{
    console.log("connection successfull")
}).catch((err)=>{
    console.log(err)
});


async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"653cab3857acfab832792fe3",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized")
}

initDB();