

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState, useCallback } from "react"; // Added useCallback
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Minus, Plus, CheckCircle, AlertCircle } from "lucide-react";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { toast } from "sonner";
// import {
//   fetchProductsByBrand,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import LoadingSpinner from "@/components/shopping-view/loading-spinner";
// import { getOrCreateSessionId } from "@/components/utils/session";

// export default function ShoppingProductDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { productDetails, relatedProducts } = useSelector(
//     (state) => state.shopProducts
//   );

//   const [quantity, setQuantity] = useState(1);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [showInstagramModal, setShowInstagramModal] = useState(false);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProductDetails(id));
//       window.scrollTo(0, 0);
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (!productDetails) return;
//     const cartItem = cartItems.items?.find(
//       (item) => item.productId === productDetails._id
//     );
//     // Only update quantity if it's the main product being viewed,
//     // otherwise it might interfere with related product add to cart logic.
//     setQuantity(cartItem ? cartItem.quantity : 1);
//   }, [productDetails, cartItems.items]);

//   useEffect(() => {
//     if (productDetails?.brand) {
//       dispatch(fetchProductsByBrand(productDetails.brand));
//     }
//   }, [productDetails, dispatch]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const userId = user?.id;
//         const sessionId = userId ? null : getOrCreateSessionId();

//         if (!userId && !sessionId) {
//           console.warn("No user or session info available");
//           return;
//         }

//         await dispatch(fetchCartItems({ userId, sessionId })).unwrap();
//       } catch (error) {
//         console.error("Failed to fetch cart:", error);
//         if (!user) {
//           localStorage.removeItem("guestSessionId");
//         }
//       }
//     };

//     fetchCart();
//   }, [dispatch, user]);

//   // Modified handleAddToCart to accept productId and desiredQuantity
//   const handleAddToCart = useCallback(async (productIdToAdd, stockAvailable) => {
//     try {
//       const userId = user?.id;
//       const sessionId = userId ? null : getOrCreateSessionId();

//       if (!userId && !sessionId) {
//         navigate("/auth/login");
//         toast.error("Please login to add items to the cart");
//         return;
//       }

//       const currentCartItems = cartItems?.items || [];
//       const existingItem = currentCartItems.find(
//         (item) => item.productId === productIdToAdd
//       );

//       const quantityToAdd = productIdToAdd === productDetails._id ? quantity : 1; // If it's the main product, use its quantity state, otherwise add 1 for related products

//       if (existingItem && existingItem.quantity >= stockAvailable) {
//         toast.error(
//           `Maximum available quantity (${stockAvailable}) reached`,
//           {
//             icon: <AlertCircle className="text-red-500" />,
//           }
//         );
//         return;
//       }

//       if (quantityToAdd > stockAvailable) {
//         toast.error(`Only ${stockAvailable} quantity can be added`, {
//           icon: <AlertCircle className="text-red-500" />,
//         });
//         return;
//       }

//       const response = await dispatch(
//         addToCart({
//           userId,
//           productId: productIdToAdd,
//           quantity: quantityToAdd,
//           sessionId,
//         })
//       ).unwrap();

//       if (response.success) {
//         await dispatch(fetchCartItems({ userId, sessionId })).unwrap();
//         toast.success("Product added to cart", {
//           icon: <CheckCircle className="text-green-500" />,
//         });
//       }
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       toast.error("Failed to add product to cart");
//     }
//   }, [user, dispatch, navigate, cartItems, productDetails, quantity]); // Include 'quantity' in dependencies

//   const handleUpdateQuantity = (type) => {
//     if (type === "plus") {
//       if (quantity + 1 > productDetails.totalStock) {
//         toast.error(`Only ${productDetails.totalStock} available`);
//         return;
//       }
//       setQuantity(quantity + 1);
//     } else {
//       if (quantity - 1 < 1) return;
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleRelatedProductClick = (productId) => {
//     navigate(`/shop/product/${productId}`);
//     window.scrollTo(0, 0);
//   };

//   const handleOrderOnWhatsApp = () => {
//     const phoneNumber = "2348164014304";
//     const productLink = `${window.location.origin}/shop/product/${productDetails._id}`;
//     const message = `Hello AFKiT,\n\nI'm interested in *"${productDetails.title}"* for *₦${Number(
//       productDetails.price
//     ).toLocaleString("en-NG")}*.\n\n*Quantity:* ${quantity}\n\nIs it still available?\n\n🔗 Product Link:\n${productLink}`;
    
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   const handleOrderOnInstagram = () => {
//     setShowInstagramModal(true);
//   };

//   const copyInstagramMessage = () => {
//     const productLink = `${window.location.origin}/shop/product/${productDetails._id}`;
//     const message = `Hello AFKiT,\n\nI'm interested in "${productDetails.title}" for ₦${Number(
//       productDetails.price
//     ).toLocaleString("en-NG")}.\n\nQuantity: ${quantity}\n\nIs it still available?\n\nProduct Link: ${productLink}`;
    
//     navigator.clipboard.writeText(message);
//     toast.success("Message copied to clipboard");
//     window.open("https://www.instagram.com/afkit_official?igsh=MXZ2MGZyOGowaDlmYw==", "_blank");
//     setShowInstagramModal(false);
//   };

//   const filteredRelatedProducts =
//     relatedProducts
//       ?.filter((p) => p._id !== productDetails?._id)
//       ?.slice(0, 4) || [];

//   if (!productDetails) {
//     return (
//       <div className="container py-8">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   const productImages =
//     productDetails.images?.length > 0
//       ? productDetails.images
//       : productDetails.image
//       ? [productDetails.image]
//       : [];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         <div className="flex flex-col md:flex-row gap-4">
//           {productImages.length > 1 && (
//             <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1">
//               {productImages.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImageIndex(index)}
//                   className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
//                     selectedImageIndex === index
//                       ? "border-primary"
//                       : "border-transparent"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`${productDetails.title} thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}

//           <div
//             className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center ${
//               productImages.length > 1 ? "order-1 md:order-2 flex-1" : "w-full"
//             }`}
//           >
//             <img
//               src={productImages[selectedImageIndex]}
//               alt={productDetails.title}
//               className="object-contain w-full max-h-full p-6"
//             />
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
//               {productDetails.title}
//             </h1>
//             <p className="text-muted-foreground mt-3 text-base md:text-lg leading-relaxed">
//               {productDetails.description}
//             </p>
//           </div>

//           <div className="flex items-center gap-6 flex-wrap">
//             <p className="text-2xl font-semibold text-primary">
//               ₦{Number(productDetails.price).toLocaleString("en-NG")}
//             </p>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-10 w-10 rounded-full"
//                 disabled={quantity === 1}
//                 onClick={() => handleUpdateQuantity("minus")}
//               >
//                 <Minus className="h-4 w-4" />
//               </Button>
//               <span className="text-lg font-medium w-8 text-center">
//                 {quantity}
//               </span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-10 w-10 rounded-full"
//                 onClick={() => handleUpdateQuantity("plus")}
//               >
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           <Button
//             className="h-12 w-full bg-blue-800 hover:bg-blue-600 text-white font-bold"
//             onClick={() => handleAddToCart(productDetails._id, productDetails.totalStock)} // Pass ID and stock
//             disabled={productDetails.totalStock === 0}
//           >
//             {productDetails.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
//           </Button>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//             <Button
//               className="h-12 bg-green-700 hover:bg-green-600 text-white font-bold"
//               onClick={handleOrderOnWhatsApp}
//             >
//               Order on WhatsApp
//             </Button>
//             <Button
//               className="h-12 bg-pink-700 hover:bg-pink-600 text-white font-bold"
//               onClick={handleOrderOnInstagram}
//             >
//               Order on Instagram
//             </Button>
//           </div>

//           <Separator />
//         </div>
//       </div>

//       {filteredRelatedProducts.length > 0 && (
//         <div className="mt-16">
//           <h2 className="text-xl font-bold text-center mb-8">
//             Related Products
//           </h2>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
//             {filteredRelatedProducts.map((product) => (
//               <div
//                 key={product._id}
//                 // The handleViewDetails is still on the parent div to navigate to product details
//                 onClick={() => handleRelatedProductClick(product._id)}
//                 className="cursor-pointer"
//               >
//                 {/* Pass handleAddToCart to the ShoppingProductTile */}
//                 <ShoppingProductTile
//                   product={product}
//                   handleAddToCart={handleAddToCart} // Pass the function here
//                   handleViewDetails={handleRelatedProductClick} // Pass the navigation function
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showInstagramModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-lg font-bold mb-4">Order on Instagram</h3>
//             <p className="mb-4">
//               Copy this message and paste it when you DM us on Instagram:
//             </p>
//             <div className="bg-gray-100 p-4 rounded mb-4">
//               <p className="whitespace-pre-wrap">
//                 Hello AFKiT,\n\nI'm interested in "{productDetails.title}" for ₦
//                 {Number(productDetails.price).toLocaleString("en-NG")}.\n\nQuantity: {quantity}.
//                 {"\n\n"}Is it still available?
//                 {"\n\n"}Product Link: {window.location.origin}/shop/product/{productDetails._id}
//               </p>
//             </div>
//             <div className="flex justify-end gap-2">
//               <Button variant="outline" onClick={() => setShowInstagramModal(false)}>
//                 Cancel
//               </Button>
//               <Button 
//                 className="bg-pink-600 hover:bg-pink-700 text-white font-bold"
//                 onClick={copyInstagramMessage}
//               >
//                 Copy & Open Instagram
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, CheckCircle, AlertCircle } from "lucide-react";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { toast } from "sonner"; // Corrected import
import {
  fetchProductsByBrand,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import LoadingSpinner from "@/components/shopping-view/loading-spinner";
import { getOrCreateSessionId } from "@/components/utils/session";

// Import react-markdown and remark-gfm
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Optional, but recommended for full markdown support

export default function ShoppingProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productDetails, relatedProducts } = useSelector(
    (state) => state.shopProducts
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showInstagramModal, setShowInstagramModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
      window.scrollTo(0, 0);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!productDetails) return;
    const cartItem = cartItems.items?.find(
      (item) => item.productId === productDetails._id
    );
    // Only update quantity if it's the main product being viewed,
    // otherwise it might interfere with related product add to cart logic.
    setQuantity(cartItem ? cartItem.quantity : 1);
  }, [productDetails, cartItems.items]);

  useEffect(() => {
    if (productDetails?.brand) {
      dispatch(fetchProductsByBrand(productDetails.brand));
    }
  }, [productDetails, dispatch]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = user?.id;
        const sessionId = userId ? null : getOrCreateSessionId();

        if (!userId && !sessionId) {
          console.warn("No user or session info available");
          return;
        }

        await dispatch(fetchCartItems({ userId, sessionId })).unwrap();
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        if (!user) {
          localStorage.removeItem("guestSessionId");
        }
      }
    };

    fetchCart();
  }, [dispatch, user]);

  // Modified handleAddToCart to accept productId and desiredQuantity
  const handleAddToCart = useCallback(async (productIdToAdd, stockAvailable) => {
    try {
      const userId = user?.id;
      const sessionId = userId ? null : getOrCreateSessionId();

      if (!userId && !sessionId) {
        navigate("/auth/login");
        toast.error("Please login to add items to the cart");
        return;
      }

      const currentCartItems = cartItems?.items || [];
      const existingItem = currentCartItems.find(
        (item) => item.productId === productIdToAdd
      );

      const quantityToAdd = productIdToAdd === productDetails._id ? quantity : 1; // If it's the main product, use its quantity state, otherwise add 1 for related products

      if (existingItem && existingItem.quantity >= stockAvailable) {
        toast.error(
          `Maximum available quantity (${stockAvailable}) reached`,
          {
            icon: <AlertCircle className="text-red-500" />,
          }
        );
        return;
      }

      if (quantityToAdd > stockAvailable) {
        toast.error(`Only ${stockAvailable} quantity can be added`, {
          icon: <AlertCircle className="text-red-500" />,
        });
        return;
      }

      const response = await dispatch(
        addToCart({
          userId,
          productId: productIdToAdd,
          quantity: quantityToAdd,
          sessionId,
        })
      ).unwrap();

      if (response.success) {
        await dispatch(fetchCartItems({ userId, sessionId })).unwrap();
        toast.success("Product added to cart", {
          icon: <CheckCircle className="text-green-500" />,
        });
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add product to cart");
    }
  }, [user, dispatch, navigate, cartItems, productDetails, quantity]); // Include 'quantity' in dependencies

  const handleUpdateQuantity = (type) => {
    if (type === "plus") {
      if (quantity + 1 > productDetails.totalStock) {
        toast.error(`Only ${productDetails.totalStock} available`);
        return;
      }
      setQuantity(quantity + 1);
    } else {
      if (quantity - 1 < 1) return;
      setQuantity(quantity - 1);
    }
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/shop/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const handleOrderOnWhatsApp = () => {
    const phoneNumber = "2348164014304";
    const productLink = `${window.location.origin}/shop/product/${productDetails._id}`;
    const message = `Hello AFKiT,\n\nI'm interested in *"${productDetails.title}"* for *₦${Number(
      productDetails.price
    ).toLocaleString("en-NG")}*.\n\n*Quantity:* ${quantity}\n\nIs it still available?\n\n🔗 Product Link:\n${productLink}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleOrderOnInstagram = () => {
    setShowInstagramModal(true);
  };

  const copyInstagramMessage = () => {
    const productLink = `${window.location.origin}/shop/product/${productDetails._id}`;
    const message = `Hello AFKiT,\n\nI'm interested in "${productDetails.title}" for ₦${Number(
      productDetails.price
    ).toLocaleString("en-NG")}.\n\nQuantity: ${quantity}.\n\nIs it still available?\n\nProduct Link: ${productLink}`;

    navigator.clipboard.writeText(message);
    toast.success("Message copied to clipboard");
    window.open("https://www.instagram.com/afkit_official?igsh=MXZ2MGZyOGowaDlmYw==", "_blank");
    setShowInstagramModal(false);
  };

  const filteredRelatedProducts =
    relatedProducts
      ?.filter((p) => p._id !== productDetails?._id)
      ?.slice(0, 4) || [];

  if (!productDetails) {
    return (
      <div className="container py-8">
        <LoadingSpinner />
      </div>
    );
  }

  const productImages =
    productDetails.images?.length > 0
      ? productDetails.images
      : productDetails.image
      ? [productDetails.image]
      : [];

  // --- NEW: Function to clean and normalize the description string ---
  const cleanDescription = (text) => {
    if (typeof text !== 'string') {
      return ''; // Ensure it's always a string
    }
    // Replace common problematic characters and normalize list items
    return text
      .replace(/\u00A0/g, ' ') // Replace non-breaking spaces with standard spaces
      .replace(/[\u2018\u2019]/g, "'") // Replace curly single quotes with straight single quote
      .replace(/[\u201C\u201D]/g, '"') // Replace curly double quotes with straight double quote
      .replace(/[\u2013\u2014]/g, '-') // Replace en-dash/em-dash with hyphen
      .replace(/\u2022/g, '- ') // Replace common unicode bullet point with markdown hyphen
      .trim(); // Trim leading/trailing whitespace
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col md:flex-row gap-4">
          {productImages.length > 1 && (
            <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${productDetails.title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div
            className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center ${
              productImages.length > 1 ? "order-1 md:order-2 flex-1" : "w-full"
            }`}
          >
            <img
              src={productImages[selectedImageIndex]}
              alt={productDetails.title}
              className="object-contain w-full max-h-full p-6"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {productDetails.title}
            </h1>
            {/* --- NEW: Use ReactMarkdown with cleanDescription --- */}
            <div className="text-muted-foreground mt-3 text-base md:text-lg leading-relaxed prose prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {cleanDescription(productDetails.description)}
              </ReactMarkdown>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <p className="text-2xl font-semibold text-primary">
              ₦{Number(productDetails.price).toLocaleString("en-NG")}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                disabled={quantity === 1}
                onClick={() => handleUpdateQuantity("minus")}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-8 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => handleUpdateQuantity("plus")}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            className="h-12 w-full bg-blue-800 hover:bg-blue-600 text-white font-bold"
            onClick={() => handleAddToCart(productDetails._id, productDetails.totalStock)}
            disabled={productDetails.totalStock === 0}
          >
            {productDetails.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button
              className="h-12 bg-green-700 hover:bg-green-600 text-white font-bold"
              onClick={handleOrderOnWhatsApp}
            >
              Order on WhatsApp
            </Button>
            <Button
              className="h-12 bg-pink-700 hover:bg-pink-600 text-white font-bold"
              onClick={handleOrderOnInstagram}
            >
              Order on Instagram
            </Button>
          </div>

          <Separator />
        </div>
      </div>

      {filteredRelatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-center mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {filteredRelatedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => handleRelatedProductClick(product._id)}
                className="cursor-pointer"
              >
                <ShoppingProductTile
                  product={product}
                  handleAddToCart={handleAddToCart}
                  handleViewDetails={handleRelatedProductClick}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showInstagramModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Order on Instagram</h3>
            <p className="mb-4">
              Copy this message and paste it when you DM us on Instagram:
            </p>
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p className="whitespace-pre-wrap">
                Hello AFKiT,\n\nI'm interested in "{productDetails.title}" for ₦
                {Number(productDetails.price).toLocaleString("en-NG")}.\n\nQuantity: {quantity}.
                {"\n\n"}Is it still available?
                {"\n\n"}Product Link: {window.location.origin}/shop/product/{productDetails._id}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowInstagramModal(false)}>
                Cancel
              </Button>
              <Button
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold"
                onClick={copyInstagramMessage}
              >
                Copy & Open Instagram
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}