export function paginateResponse(data, pages, limit) {
  const [result, total] = data;
  const lastPage = Math.ceil(total/limit);
  const nextPage = pages + 1 > lastPage ? null : pages + 1;
  const prevPage = pages - 1 < 1 ? null : pages - 1;
  return {
    statusCode: 'success',
    data: [...result],
    count: total,
    currentPage: pages,
    nextPage: nextPage,
    prevPage: prevPage,
    lastPage: lastPage,
  }
}