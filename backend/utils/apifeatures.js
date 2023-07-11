class ApiFeatures {
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr;
    }

    //This code will search the specific iteam in the products 

    search(){
        const keyword = this.querystr.keyword ? {
        name:{
            $regex:this.querystr.keyword,
            $options:"i",
        }
        }:{}
        this.query = this.query.find({...keyword});
        return this;
    }

    //This will filter the products  by category

    filter(){
        const queryCopy = {...this.querystr}  //this will make the copy of querystr beacase we need some change in filter

        // Removing some fields for category

        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key])   //this will renove the specific querystr in the main querystr
       
       // Filter the iteams by price and rating

       let querystr = JSON.stringify(queryCopy)
       querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);  //this is a reular expression that add the $ sign with all operators of mongodb       
        
        this.query = this.query.find(JSON.parse(querystr))
        return this

    }
}

module.exports = ApiFeatures