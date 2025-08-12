import app from "./src/app";
import logger from "./src/config/logger";
import connectDB from "./src/config/db";

const startServer = async () => {
  const PORT =  process.env.PORT || 5000

  try {
    await connectDB();

    app
      .listen(PORT, () => console.log(`Listening on port ${PORT}`))
      .on("error", (err) => {
        console.log("err", err.message);
        process.exit(1);
      });
  } catch (err) {
    logger.error("Error happened: ", err.message);
    process.exit(1);
  }
};

void startServer();
