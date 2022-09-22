import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "imagesDB",
  "vultradmin",
  "AVNS_3_NVuqqmIBwhTY7W5Nv",
  {
    host: "vultr-prod-f504d363-edc8-4bff-a4e0-d7328c6d72f6-vultr-prod-8b55.vultrdb.com",
    dialect: "mysql",
    port: 16751,
  }
);

const Images = sequelize.define("imgs", {
  ali_img_link: { type: DataTypes.STRING, allowNull: false },
  amz_img_link: { type: DataTypes.STRING, allowNull: false },
  eucl_dist: DataTypes.FLOAT(5, 2),
});

(async () => {
  await sequelize.sync({ force: false });
})();

export default Images;
