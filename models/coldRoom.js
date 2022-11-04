module.exports=(sequelize,DataTypes)=>{

    const coldRoom=sequelize.define('coldRoom',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false,

        },

        name:{
            type:DataTypes.STRING,
            allowNull:false,

        },
        longitude:{
            type:DataTypes.DOUBLE,
            allowNull:false,
        },
        latitude:{
            type:DataTypes.DOUBLE,
            allowNull:false,
        },



    });
    return coldRoom;


}