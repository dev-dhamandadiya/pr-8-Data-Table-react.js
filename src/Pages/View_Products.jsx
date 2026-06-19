import React, { useEffect, useState } from 'react'

const View_Products = ({ list, handleDelete, handleEdit }) => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(3);

  const firstIndex = (page - 1) * limit;
  const lastIndex = firstIndex + limit;

  const totalPage = Math.ceil(data.length / limit);

  const handleFilter = () => {

    let filterData = [...list];

    if (search) {
      filterData = filterData.filter((item) =>
        item.productName
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category) {
      filterData = filterData.filter(
        (item) => item.category === category
      );
    }

    setData(filterData);

    if (page > Math.ceil(filterData.length / limit)) {
      setPage(1);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [search, category, list]);

  return (
    <>
      <div className="container mt-4">

        <h2 className="mb-3">Product List</h2>

        <div className="row mb-3">

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search Product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
              <option value="Painting">Painting</option>

            </select>
          </div>

        </div>

        <table className="table table-bordered table-striped table-hover">

          <thead className="table-dark">
            <tr>
              <th>Sr.No</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {data.length > 0 ? (

              data.slice(firstIndex, lastIndex).map((item, index) => (

                <tr key={item.id}>

                  <td>{firstIndex + index + 1}</td>

                  <td>
                    <img
                      src={item.image}
                      alt={item.productName}
                      width="60"
                      height="60"
                    />
                  </td>

                  <td>{item.productName}</td>

                  <td>₹{item.price}</td>

                  <td>{item.category}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="6" className="text-center text-danger">
                  No Data Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

        <div className="d-flex justify-content-end mt-3">

          <nav>
            <ul className="pagination">

              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPage)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === totalPage || totalPage === 0 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </li>

            </ul>
          </nav>

        </div>

      </div>
    </>
  )
}

export default View_Products