import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize("imagesDB", "root", "", {
  host: "localhost",
  dialect: "mysql",
  debug: true,
});

const Images = sequelize.define("imgs", {
  ali_img_link: { type: DataTypes.STRING, allowNull: false },
  amz_img_link: { type: DataTypes.STRING, allowNull: false },
  eucl_dist: DataTypes.FLOAT(5, 2),
});

(async () => {
  await sequelize.sync({ force: false });
})();

export default Images;
