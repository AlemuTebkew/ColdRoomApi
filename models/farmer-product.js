const {db} = require("../config/database");

module.exports =(sequelize,Datatypes)=>{
    const farmerProduct= sequelize.define('FarmerProduct',{
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        quality:{
           type:Datatypes.STRING,
           allowNull:false
         },
         oldQuantity:{
            type:Datatypes.DOUBLE,
            allowNull:false
         },
         soldQuantity:{
            type:Datatypes.DOUBLE,
            allowNull:false
         },
         currentQuantity:{
            type:Datatypes.DOUBLE, 
            allowNull:false
         },
         pricePerKg:{ //this field come from current cold room product price
            type:Datatypes.DOUBLE,
            allowNull:false
         },
         coldRoomId:{
            type:Datatypes.INTEGER,
            allowNull:false
         },
         productId:{
            type:Datatypes.INTEGER,
            allowNull:false,  
            // references:{
            //    model:'product',
            //    key:'id'
            // }
         },
         warehousePosition:{
            type:Datatypes.STRING,
            allowNull:false
         },
         addedDate:{
           type:Datatypes.DATE
         }
    });
    return farmerProduct;
}