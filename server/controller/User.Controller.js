
const {  verifyPassword } = require('../Helper');
const { findUserByEmail,findUserByID, insertUser, updatePassword, saveAddress, getAllAddress, deleteAddressById, updateAddressById } = require('../model/Auth.Model')


const { getUserById } = require('../model/User.Model');


const GetUser = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await getUserById(id);
        return res.json({ error: false, user_details: data });
    } catch (error) {
        console.log('get user controller error:', error);
        return res.json({ error: error });
    }
}

const UpdatePassword = async (req, res) => {
    // console.log('update password controller called');
    try {
        const {user_id}= req;
        const { newPassword,oldPassword } = req.body;
        const result = await findUserByID(user_id);
        const userExist = await verifyPassword(oldPassword, result[0].password);
        if(userExist){
            const data= await updatePassword(newPassword, user_id);
            return res.json({error:false, message:'Password updated successfully'})
        }
        return res.json({error:true, message:'Old password is wrong !!'});

    } catch (error) {
        console.log(error);
        return res.json({error:true, message:'Something went wrong !!',Error: error});
    }

}


const AddAddress= async(req,res)=>{
    try {
        const {first_name,last_name,house_no,street,pin,state,telephone}= req.body;
        const {user_id}= req;
        const data= await saveAddress(first_name,last_name,house_no,street,pin,state,telephone,user_id);
        // console.log(data);
        res.json({error:false,message:'Address saved successfully'});
        
    } catch (error) {
        console.log(error);
        return res.json({error:true, message:'Something went wrong !!',Error:error});
    }
}

const GetAddress= async(req,res)=>{
    try {
        // console.log('get address called');
        const {user_id}= req;
        const data= await getAllAddress(user_id);
        return res.json({error:false,address:data});
        
    } catch (error) {
        console.log(error);
        return res.json({error:true, message:'Something went wrong !!',Error:error});
    }
}


const DeleteAddress= async(req,res)=>{
    try {
        const {id}=req.params;
        const data= await deleteAddressById(id);
        return res.json({error:false, message:'Deleted !!'});

        
    } catch (error) {
        console.log(error);
        return res.json({error:true, message:'Something went wrong !!',Error:error});
        
    }
}

const UpdateAddress= async(req,res)=>{
    try {
        const {first_name,last_name,house_no,street,pin,state,telephone}= req.body;
        const {id}=req.params;
        const data= await updateAddressById(id,first_name,last_name,house_no,street,pin,state,telephone);
        return res.json({error:false, message:'Address updated !!'});

        
    } catch (error) {
        console.log(error);
        return res.json({error:true, message:'Something went wrong !!',Error:error});
    }
}


module.exports = {
    GetUser,
    UpdatePassword,
    AddAddress,
    GetAddress,
    DeleteAddress,
    UpdateAddress
}