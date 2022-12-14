const { db } = require("../../config/database");

const WholeSaler = db.wholeSaler;
const Order = db.order;


const getSales = async (req, res) => {
  try {

    const coldRoomId=req.user.coldRoomId

    if (!coldRoomId) {
      res.status(404).json('Error ')

    }
    const sales = await Order.findAll({
      attributes: { exclude: ["coldRoomId", "wholeSalerId", "updatedAt"] },
       where:{orderStatus:'completed',coldRoomId:coldRoomId},
      include: [
        {
          model: WholeSaler,
          attributes: ["fName", "lName"],
        },
      ],
    });
    res.status(200).json(sales);
  } catch (err) {
    res.status(400).json("Error While Fetching  Sales");
  }
};


module.exports={getSales}