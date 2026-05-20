import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getEquipment } from "../services/api";
import Navbar from "../components/Navbar";

export default function Home() {

const [products,setProducts]=useState([]);
const [equipment,setEquipment]=useState([]);

useEffect(()=>{

const fetchData=async()=>{

try{

const productData=await getProducts();
const equipmentData=await getEquipment();

setProducts(productData);
setEquipment(equipmentData);

}catch(error){

console.error("Error fetching data:",error);

}

};

fetchData();

},[]);


return(

<div className="min-h-screen bg-gray-50 text-gray-800">
<Navbar />





{/* HERO */}

<section
className="relative text-white text-center py-28 md:py-40 px-6"
style={{
backgroundImage:"url('/images/hero-farm.jpg')",
backgroundSize:"cover",
backgroundPosition:"center"
}}
>

<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-green-900/70"></div>

<div className="relative z-10 max-w-4xl mx-auto">

<h2 className="text-4xl md:text-6xl font-bold mb-6">
Supporting Farmers Across Malawi
</h2>

<p className="text-lg mb-10 opacity-90">
Premium seeds, livestock and modern farming equipment — trusted by growers nationwide.
</p>


<div className="flex justify-center gap-5 flex-wrap">

<Link
to="/products"
className="bg-yellow-400 text-black px-10 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
>
Explore Products
</Link>


<Link
to="/equipment"
className="border border-white px-10 py-3 rounded-full hover:bg-white hover:text-green-800 transition"
>
Hire Equipment
</Link>

</div>

</div>

</section>



{/* TRUST STRIP */}

<section className="bg-white shadow-sm">

<div className="max-w-6xl mx-auto py-6 flex flex-wrap justify-center gap-6 text-center text-green-700 font-semibold">

<span>✔ Quality Seeds</span>

<span>✔ Modern Equipment</span>

<span>✔ Healthy Livestock</span>

<span>✔ Nationwide Support</span>

</div>

</section>



{/* FEATURES SECTION */}

<section className="py-24 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

<div>

<div className="text-5xl mb-4">🌱</div>

<h3 className="text-xl font-bold text-green-800 mb-2">
Certified Seeds
</h3>

<p className="text-gray-600">
High-yield seed varieties suitable for Malawi farming conditions.
</p>

</div>


<div>

<div className="text-5xl mb-4">🚜</div>

<h3 className="text-xl font-bold text-green-800 mb-2">
Equipment Hire
</h3>

<p className="text-gray-600">
Affordable access to tractors and modern farm machinery.
</p>

</div>


<div>

<div className="text-5xl mb-4">🐄</div>

<h3 className="text-xl font-bold text-green-800 mb-2">
Healthy Livestock
</h3>

<p className="text-gray-600">
Carefully raised animals from trusted breeders.
</p>

</div>

</section>



{/* PRODUCTS PREVIEW */}

<section className="py-24 px-6 max-w-6xl mx-auto">

<h3 className="text-4xl font-bold text-center text-green-800 mb-14">

Popular Products

</h3>


<div className="grid md:grid-cols-3 gap-10">

{products.slice(0,3).map(item=>(

<div
key={item.id}
className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden"
>

{item.image && (

<img
src={`https://njalawaka-agri-and-general-dealers.onrender.com/uploads/${item.image}`}
className="w-full h-56 object-cover"
/>

)}

<div className="p-6">

<h4 className="text-xl font-bold text-green-700 mb-2">
{item.name}
</h4>

<p className="text-gray-600 text-sm">
{item.description}
</p>

</div>

</div>

))}

</div>


<div className="text-center mt-12">

<Link
to="/products"
className="text-green-700 font-semibold hover:underline"
>
View All Products →
</Link>

</div>

</section>



{/* EQUIPMENT PREVIEW */}

<section className="bg-white py-24 px-6">

<h3 className="text-4xl font-bold text-center text-green-800 mb-14">

Equipment Hire

</h3>


<div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

{equipment.slice(0,2).map(item=>(

<div
key={item.id}
className="bg-gray-50 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden"
>

{item.image && (

<img
src={`https://njalawaka-agri-and-general-dealers.onrender.com/uploads/${item.image}`}
className="w-full h-56 object-cover"
/>

)}

<div className="p-6">

<h4 className="text-xl font-bold text-green-700 mb-2">
{item.name}
</h4>

<p className="text-gray-600 text-sm">
{item.description}
</p>

</div>

</div>

))}

</div>


<div className="text-center mt-12">

<Link
to="/equipment"
className="text-green-700 font-semibold hover:underline"
>
View All Equipment →
</Link>

</div>

</section>



{/* CTA STRIP */}

<section className="bg-green-700 text-white py-16 md:py-20 text-center">

<h3 className="text-4xl font-bold mb-4">

Ready to Boost Your Farm Productivity?

</h3>

<p className="mb-8 opacity-90">

Talk to our team instantly on WhatsApp for product availability and pricing.

</p>


<a
href="https://wa.me/265999145003"
className="bg-white text-green-700 px-10 py-3 rounded-full font-semibold"
>

Chat With Us Now

</a>

</section>



{/* FOOTER */}

<footer className="bg-green-900 text-white text-center py-8 text-sm">

© {new Date().getFullYear()} Njalawaka Agri and General Dealers

</footer>



{/* FLOAT BUTTON */}

<a
href="https://wa.me/265999145003"
target="_blank"
rel="noopener noreferrer"
className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg"
>

WhatsApp

</a>


</div>

);

}