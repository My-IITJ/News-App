import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    let DB_URI = process.env.MONGO_DB_URI;

    mongoose
      .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('connected to mongoose');
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
