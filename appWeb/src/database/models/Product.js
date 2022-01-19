module.exports = (sequelize, dataTypes) => {
    let alias = "Productos";
    let cols = {
      idProductos: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: dataTypes.FLOAT,
        allowNull: false,
      },
      price: {
        type: dataTypes.FLOAT,
        allowNull: false
      }
    };
    let config = {
      tableName: "productos",
      timestamps: false,
    };
    
    const Product = sequelize.define(alias,cols,config);
    
    Product.associate = function(models){
        Product.belongsTo(models.Categorias,{
            as: "categorias",
            foreignKey: "Categoria_id"
        })

        Product.belongsToMany(models.Usuarios,{
            as: "usuarios",
            through: "compras",
            foreignKey: "Productos_idProductos",
            otherKey: "Usuarios_idUsuario",
            timestamps: false
        })
    }
    return Product;
  };