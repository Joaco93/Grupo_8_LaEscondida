module.exports = (sequelize, dataTypes) => {
    let alias = "Categorias";
    let cols = {
      idCategoria: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      }
    };
    let config = {
      tableName: "categoria",
      timestamps: false,
    };
    
    const Categoria = sequelize.define(alias,cols,config);

    Categoria.associate = function(models){
      Categoria.hasMany(models.Productos,{
        as: "productos",
        foreignKey: "categoria_id"
      })
    }
    return Categoria;
  };