import mongoose from "mongoose";
import app from "./app";
import config from "config";
import logger from "./config/logger";

const startServer = () => {
  const PORT = Number(config.get("server.port")) || 5502;
  try {
    app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(err.message);
      logger.on("finish", () => {
        process.exit(1);
      });
    }
  }
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info(`Connected to database and server starts`);
    startServer();
  })
  .catch(() => {
    process.exit(1);
  });
