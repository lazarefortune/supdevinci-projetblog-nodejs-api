class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  withGraphFetch(relation) {
    this.query = this.query.withGraphFetched(relation);
    return this;
  }

  limit() {
    const limit = this.queryString.limit * 1 || 100;
    this.query = this.query.limit(limit);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sort = this.queryString.sort.split(",").join(" ").split(":");
      const sortBy = sort[0];
      const sortOrder = sort[1] || "asc";
      this.query = this.query.orderBy(sortBy, sortOrder);

      // const sortBy = this.queryString.sort.split(",").join(" ");
      // const orderType = this.queryString.sort.split(":").join(" ") || "desc";
      // this.query = this.query.orderBy(sortBy);
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    this.query = this.query.page(page - 1, limit);

    return this;
  }
}

export default APIFeatures;
