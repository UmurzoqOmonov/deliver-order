const pagination = async (query, table, configPage) => {
  const page = query.page || configPage.page || 1;
  const size = query.size || configPage.size || 5;

  const allTable = await table.findAndCountAll({
    offset: (page - 1) * size,
    limit: size,
  });
  allTable.totalPage = Math.ceil(allTable.count / size);
  allTable.nextPage = allTable.totalPage > page;
  allTable.lastPage = allTable.totalPage > 0 && allTable.totalPage < page;
  // console.log(allTable);
  return allTable;
};

module.exports = pagination;
