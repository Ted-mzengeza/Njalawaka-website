import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Products() {

const [products,setProducts]=useState([]);
const [open,setOpen]=useState(null);

useEffect(()=>{

fetch("https://njalawaka-agri-and-general-dealers.onrender.com/products")
.then(res=>res.json())
.then(data=>setProducts(data));

},[]);


const seeds = products.filter(p =>
p.category?.toLowerCase()==="seed"
);

const grains = products.filter(p =>
p.category?.toLowerCase()==="grain"
);


const ProductCard=(product)=>(

<div
key={product.id}
className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden"
>

{product.image && (

<img
src={`https://njalawaka-agri-and-general-dealers.onrender.com/uploads/${product.image}`}
className="w-full h-56 object-cover"
/>

)}

<div className="p-6">

<h3 className="text-xl font-bold text-green-700 mb-2">
{product.name}
</h3>

<p className="text-gray-600 mb-3">
{product.description}
</p>

{product.price && (

<p className="font-semibold text-green-700 mb-4">
MWK {product.price}
</p>

)}

<a
href="https://wa.me/265999145003"
target="_blank"
rel="noreferrer"
className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
>
Order on WhatsApp
</a>

</div>

</div>

);


return(

<div className="bg-gray-50 min-h-screen">
<Navbar />


{/* HERO */}

<div
className="relative text-white text-center py-36"
style={{
backgroundImage:"url('/images/product-bg.jpg')",
backgroundSize:"cover",
backgroundPosition:"center"
}}
>

<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-green-900/60"></div>

<div className="relative z-10 max-w-3xl mx-auto">

<h1 className="text-4xl md:text-6xl font-bold mb-4">
Premium Agricultural Products
</h1>

<p className="text-lg opacity-90">
Certified seeds and grains supporting Malawian farmers nationwide
</p>

</div>

</div>


{/* TRUST STRIP */}

<div className="bg-white shadow-sm">

<div className="max-w-6xl mx-auto py-6 flex flex-wrap justify-center gap-6 text-center text-green-700 font-semibold">

<span>✔ Quality Assured</span>
<span>✔ Farmer Trusted</span>
<span>✔ Nationwide Supply</span>

</div>

</div>



{/* PRODUCTS */}

<div className="max-w-7xl mx-auto px-8 py-16 md:py-20">


<button
onClick={()=>setOpen(open==="seed"?null:"seed")}
className="text-3xl font-bold text-green-700 mb-8"
>
Seeds {open==="seed"?"▲":"▼"}
</button>


{open==="seed" && (

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
{seeds.map(ProductCard)}
</div>

)}



<button
onClick={()=>setOpen(open==="grain"?null:"grain")}
className="text-3xl font-bold text-green-700 mb-8"
>
Grains {open==="grain"?"▲":"▼"}
</button>


{open==="grain" && (

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
{grains.map(ProductCard)}
</div>

)}

</div>



{/* CTA STRIP */}

<div className="bg-green-700 text-white text-center py-16">

<h2 className="text-3xl font-bold mb-4">
Need help choosing the right product?
</h2>

<p className="mb-6">
Chat with our team instantly on WhatsApp
</p>

<a
href="https://wa.me/265999145003"
className="bg-white text-green-700 px-4 sm:px-6 md:px-8 py-3 rounded-full font-semibold"
>
Contact Us Now
</a>

</div>

</div>

)

}

export default Products