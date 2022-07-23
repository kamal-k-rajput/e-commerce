class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyward = this.queryStr.keyward
      ? {
          name: {
            $regex: this.queryStr.keyward,
            $options: "i",
          },
        }
      : {};
    console.log(keyward);
    this.query = this.query.find({ ...keyward });
    return this;
  }
}

module.exports = ApiFeatures;
