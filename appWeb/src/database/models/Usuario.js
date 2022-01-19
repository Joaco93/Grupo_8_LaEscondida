module.exports = (sequelize, dataTypes) => {
  let alias = "Usuarios";
  let cols = {
    idUsuarios: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER  
    },
    name: { 
      allowNull: false,
      type: dataTypes.STRING
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false
    },
    password: {
      allowNull: false,
      type: dataTypes.STRING
    },
    avatar: {
      allowNull: false,
      type: dataTypes.STRING
    },
    fechaNacimiento: {
      type: dataTypes.DATE,
    },
  };
  let config = {
    tableName: "usuarios",
    timestamps: false,
  };

  const Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = function (models) {
    Usuario.belongsToMany(models.Productos, {
      as: "productos",
      through: "compras",
      foreignKey: "Usuarios_idUsuario",
      otherKey: "Productos_idProducto",
      timestamps: false
    })
  }

  return Usuario;
};