const mongoose=require('mongoose')
const project=`E-commerce`

const connect_mongoose=async()=>{
    try {
        await mongoose.connect(`mongodb://localhost/${project}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(`${project} is on the GO.`)
    } catch (error) {
        console.log(`Mongoose crashed becouse: `, error)
    }
}

module.exports=connect_mongoose