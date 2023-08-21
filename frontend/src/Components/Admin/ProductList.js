import React, { useEffect,Fragment } from 'react'
import "./productList.css"
import { DataGrid } from '@mui/x-data-grid'
import { useSelector,useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import { getAdminProducts,clearErrors,deleteProduct } from '../../actions/productActions'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Sidebar from './Sidebar'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const ProductList = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()


    const {error , products} = useSelector(state => state.products)
    const {error:deleteError,isDeleted} = useSelector(state => state.deleteProduct)

    const deleteProductHandler = (id) => {
          dispatch(deleteProduct(id))
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
          alert.error(deleteError)
          dispatch(clearErrors())
      }

      if(isDeleted){
        alert.success("Product Deleted Successfully")
        navigate("/admin/dashboard")
        dispatch({type:DELETE_PRODUCT_RESET})
        
      }
        dispatch(getAdminProducts())
     },[dispatch,alert,error,deleteError,navigate,isDeleted])

    const columns =[
        {field:"id",headerName:"Product ID", minWidth:200,flex:0.5},

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
          },
          {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
          },
      
          {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
          },
          {
            field:"actions",
            headerName:"Actions",
            flex:0.3,
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell: (params) => {
                return (
                  <Fragment>
                     <Link to={`/admin/product/${params.row.id}`}>
                      <EditIcon />
                    </Link>
        
                    <Button
                      onClick={() =>
                        deleteProductHandler(params.row.id)
                      }
                    >
                      <DeleteIcon />
                    </Button>
                  </Fragment>
                );
              },
          }
    ]

    const rows = [];

    products &&
      products.forEach((item) => {
        rows.push({
          id: item._id,
          stock: item.Stock,
          price: item.price,
          name: item.name,
        });
      });


  return (
    <>
         <MetaData title={`ALL PRODUCTS - Admin`} />
         <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  )
}

export default ProductList