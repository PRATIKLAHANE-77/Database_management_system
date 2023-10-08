const express = require("express");
const app = express();
const sequelize = require("./SDatabase.js");
const cors = require("cors");

app.use(express.json());
app.use(express.json({ extended: true }));
app.use(cors());

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    app.post("/createTable", async (req, res) => {
      try {
        const { tablename, fieldname, type } = req.body;

        // Define a new model with a single column
        const CustomModel = sequelize.define(
          tablename,
          {
            [fieldname]: {
              type:
                sequelize.Sequelize[type.toUpperCase()] ||
                sequelize.Sequelize.STRING,
              allowNull: false,
            },
          },
          {
            // You can specify additional model options here
          }
        );

        // Create the table
        await CustomModel.sync({ force: true }); // Use { force: true } to drop the table if it already exists

        res.status(200).json(tablename);
      } catch (error) {
        console.error("Error creating table:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/show", (req, res) => {
      const param = req.query.name; // Get the table name from the query parameter
      console.log(param);
    });

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Database synchronization error:", err);
  });
