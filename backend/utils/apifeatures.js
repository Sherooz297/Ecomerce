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
}

module.exports = ApiFeatures