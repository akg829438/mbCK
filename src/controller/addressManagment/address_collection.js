const User = require("../../model/userLoginPart/user_modal")
exports.getAddresses=async(req,res)=>{
    try{
    
        const user=await User.findOne({_id:req.user.userId});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json({ addresses:user.addresses });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
}
exports.getAddresseById=async(req,res)=>{
  try{
  
      const user=await User.findOne({_id:req.user.userId});
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const address = user.addresses.id(req.params.addressId);
        res.status(200).json({ address:address });
  }
  catch (error) {
      res.status(500).json({ message: error.message });
    }
}
exports.addAddress= async (req, res) => {
    try {
     
      const userId=req.user.userId
      const {  address } = req.body;
  
      const user = await User.findOne({ _id:userId });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      user.addresses.push(address);
      await user.save();
      const addedAddress=user.addresses[user.addresses.length-1]
      res.status(200).json({ address:addedAddress,message: 'Address added successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateAddress=async (req, res) => {
    try {
      const userId=req.user.userId;
      const {  addressId, updateAddress } = req.body;
    
      const user = await User.findOne({ _id:userId });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const address = user.addresses.id(addressId);
  
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
  
      address.set(updateAddress);
      await user.save();
  
      res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  exports.deleteAddress=async (req, res) => {
    try {
     const userId=req.user.userId;
      const {  addressId } = req.body;
  
      const user = await User.findOne({ _id:userId});
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.addresses.pull({_id:addressId});
      await user.save();
  
      res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  exports.setDefaultAddress=async (req, res) => {
    try {
      const {userId}=req.user
      const { addressId } = req.body;
  
      const user = await User.findOne({ _id:userId });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const address = user.addresses.id(addressId);
  
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
  
      user.addresses.forEach(addr => (addr.isDefault = false));
      address.isDefault = true; 
      user.defaultAddress = address; 
      await user.save();
  
      res.status(200).json({ message: 'Default address updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  exports.getDefaultAddress=async (req, res) => {
    try {
      const userId=req.user.userId
  
      const user = await User.findOne({ _id:userId });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const defaultAddress = user.defaultAddress;
  
      if (!defaultAddress) {
        return res.status(404).json({ message: 'Default address not set' });
      }
  
      res.status(200).json({ defaultAddress });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }