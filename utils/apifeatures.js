// BUILD QUERY
class APIFeatures {
    // query contain mongoose query
    // queryString contain query string from express
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const queryObj = { ...this.queryString }; // This structuring here, these three dots, will basically take all the fields out of the object.
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);
        
        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        
        this.query = this.query.find(JSON.parse(queryStr));
        
        // Return the entire object then has access to other methods
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            console.log(this.queryString.sort);
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
  
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v'); //to exclude select field use "-" minus
        }
        return this;
    }
  
    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        
        //
        this.query = this.query.skip(skip).limit(limit);
        
        return this;
    }
}

module.exports = APIFeatures;
  