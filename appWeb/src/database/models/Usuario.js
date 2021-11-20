module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios";
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
      tableName: "Usuarios",
      timestamps: false,
    };
    
    const Usuario = sequelize.define(alias,cols,config);
    return Usuario;
  };