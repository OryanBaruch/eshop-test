const express=require('express')
const cors=require('cors')
const port=5000
const connect_mongoose=require('../server/DBconfig/DBconfig')
const {initUsers}=require('./models/user.model')
const {initProducts}=require('./models/product.model')

const initDataBase=async ()=>{
    await initUsers()
    await initProducts()
}

// initDataBase()

connect_mongoose()
const app=express()
app.use(express.json())
app.use(cors())

app.use('/auth', require('./routes/auth.routes'))
app.use('/product', require('./routes/product.routes'))
app.use('/cart', require('./routes/cart.routes'))
app.use('/order', require('./routes/order.routes'))

app.listen(port, ()=> console.log(`Go on ${port}, enjoy.`))
