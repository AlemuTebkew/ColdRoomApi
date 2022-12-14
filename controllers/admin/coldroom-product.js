const { db } = require("../../config/database");
const Op=db.Sequelize.Op
const bcrypt = require("bcrypt");
const FarmerProduct =db.farmerProduct;
const {AddFarmer} = require("./farmer");
const { getPagination, getPagingData } = require("./pagination/getPagination");

const ColdRoomProduct = db.coldRoomProduct;
const FarmerRent=db.FarmerRent

const getColdroomProducts =async(req,res)=>{

  try {

    const fp=await FarmerProduct.findAll({
       where:{coldRoomId:req.params.id},
     attributes:['productId',[ db.sequelize.fn('sum',db.sequelize.col('oldQuantity')),'totalProduct'],   
   ],
   include:[ 
    {
     model:db.product ,
     attributes:['name','imageUrl']
   },{
    model:db.coldRoom ,
    attributes:['id','name']
  }
  ],
     group:['productId'],
    
    });
            
    res.json(fp)   
    
  } catch (error) {
    res.status(404).json('Error '+error)
  }
  
}

const getProductDetail =async(req,res)=>{

  const { page, perPage, coldRoomId, date } = req.query;

  const { limit, offset } = getPagination(page, perPage);
  var filterByDate = date ? {createdAt: { [Op.lte]: date }  } :null

  try {
    const fp=await FarmerProduct.findAndCountAll({
      //attributes:['productId'],
      where:{
        productId:req.params.id,
        coldRoomId:coldRoomId,
         ...filterByDate
      },
      limit: limit,
      offset: offset,
      include:[{
    model:db.farmer ,
     attributes:['fName','lName']
  },{
    model:db.productType ,
     attributes:['title','imageUrl'] 
  },
  {
    model:db.product ,
     attributes:['name'] 
  },
  {
    model:db.coldRoom ,
    attributes:['id','name']
  } 
  ],     
    });

    const paginated=getPagingData(fp,page,limit)
    res.status(200).json(paginated);
  } catch (error) {
    console.log("Error "+error)
  }
 
}


module.exports={getColdroomProducts,getProductDetail}