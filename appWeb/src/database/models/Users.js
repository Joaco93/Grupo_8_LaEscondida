module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      fecha_nacimiento: {
        type: dataTypes.DATE,
      },
    };
    let config = {
      tableName: "users",
      timestamps: false,
    };
  
    return alias;
  };