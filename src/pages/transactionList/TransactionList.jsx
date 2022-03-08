import "./transactionList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction, getTransactions } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => 
    state.transaction.transactions
  );

  useEffect(() => {
    getTransactions(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteTransaction(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { 
      field: "userId", headerName: "userId", width: 220,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.value}>
              {params.value}
            </Link>
          </>
        );
      },
    },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "address",
      headerName: "Address",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/transaction/" + params.row._id}>
              <button className="productListEdit">VIEW</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={transactions}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}