import mongoose from 'mongoose'
const { connect } = mongoose

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI)
    console.log(`MongoDB je povezana na: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
