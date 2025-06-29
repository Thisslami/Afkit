// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   productList: [],
//   imageUploadLoading: false,
// };

// export const uploadProductImages = createAsyncThunk(
//   "products/uploadImages",
//   async (imageFiles, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       imageFiles.forEach(file => {
//         formData.append('my_files', file);
//       });

//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/admin/products/upload-images`,
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const addNewProduct = createAsyncThunk(
//   "products/addnewproduct",
//   async (productData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/admin/products/add`,
//         productData,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const fetchAllProducts = createAsyncThunk(
//   "products/fetchAllProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/admin/products/get`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const editProduct = createAsyncThunk(
//   "products/editProduct",
//   async ({ id, productData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/admin/products/edit/${id}`,
//         productData,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "products/deleteProduct",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/admin/products/delete/${id}`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const AdminProductsSlice = createSlice({
//   name: "adminProducts",
//   initialState,
//   reducers: {
//     resetProductState: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadProductImages.pending, (state) => {
//         state.imageUploadLoading = true;
//       })
//       .addCase(uploadProductImages.fulfilled, (state) => {
//         state.imageUploadLoading = false;
//       })
//       .addCase(uploadProductImages.rejected, (state) => {
//         state.imageUploadLoading = false;
//       })

//       .addCase(fetchAllProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchAllProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.productList = action.payload.data || [];
//       })
//       .addCase(fetchAllProducts.rejected, (state) => {
//         state.isLoading = false;
//       })

//       .addCase(addNewProduct.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(addNewProduct.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(addNewProduct.rejected, (state) => {
//         state.isLoading = false;
//       })

//       .addCase(editProduct.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(editProduct.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(editProduct.rejected, (state) => {
//         state.isLoading = false;
//       })

//       .addCase(deleteProduct.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteProduct.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(deleteProduct.rejected, (state) => {
//         state.isLoading = false;
//       });
//   },
// });

// export const { resetProductState } = AdminProductsSlice.actions;
// export default AdminProductsSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  imageUploadLoading: false,
};

export const uploadProductImages = createAsyncThunk(
  "products/uploadImages",
  async (imageFiles, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      imageFiles.forEach(file => {
        formData.append('my_files', file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/products/upload-images`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addnewproduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/products/add`,
        productData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/products/get`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/products/edit/${id}`,
        productData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/admin/products/delete/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const hideProduct = createAsyncThunk(
  "products/hideProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/products/hide/${id}`
      );
      return response.data; // This should match the controller response structure
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const unhideProduct = createAsyncThunk(
  "products/unhideProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/products/unhide/${id}`
      );
      return response.data; // This should match the controller response structure
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    resetProductState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProductImages.pending, (state) => {
        state.imageUploadLoading = true;
      })
      .addCase(uploadProductImages.fulfilled, (state) => {
        state.imageUploadLoading = false;
      })
      .addCase(uploadProductImages.rejected, (state) => {
        state.imageUploadLoading = false;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data || [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(hideProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hideProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.success) {
        state.productList = state.productList.map(product => 
          product._id === action.payload.data._id ? action.payload.data : product
        );
      }
    })
      .addCase(hideProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(unhideProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unhideProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.success) {
        state.productList = state.productList.map(product => 
          product._id === action.payload.data._id ? action.payload.data : product
        );
      }
    })
      .addCase(unhideProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetProductState } = AdminProductsSlice.actions;
export default AdminProductsSlice.reducer;