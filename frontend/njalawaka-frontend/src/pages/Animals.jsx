import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Animals(){

const [animals,setAnimals]=useState([]);

useEffect(()=>{

fetch("https://njalawaka-agri-and-general-dealers.onrender.com/animals")
.then(res=>res.json())
.then(data=>setAnimals(data));

},[]);


return(

<div className="bg-gray-50 min-h-screen">
<Navbar />


{/* HERO */}

<div
className="relative text-white text-center py-36"
style={{
backgroundImage:"url('/images/animals-bg.jpg')",
backgroundSize:"cover",
backgroundPosition:"center"
}}
>

<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-green-900/60"></div>

<div className="relative z-10">

<h1 className="text-4xl md:text-6xl font-bold mb-4">
Healthy Farm Animals
</h1>

<p className="text-lg">
Quality livestock raised responsibly
</p>

</div>

</div>



{/* GRID */}

<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

{animals.map(animal=>(

<div
key={animal.id}
className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden"
>

{animal.image && (

<img
src={`https://njalawaka-agri-and-general-dealers.onrender.com/uploads/${animal.image}`}
className="w-full h-56 object-cover"
/>

)}

<div className="p-6">

<h3 className="text-xl font-bold text-green-700 mb-2">
{animal.name}
</h3>

<p className="text-gray-600 mb-4">
{animal.description}
</p>

<a
href="https://wa.me/265999145003"
className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
>
Order on WhatsApp
</a>

</div>

</div>

))}

</div>



{/* CTA */}

<div className="bg-green-700 text-white text-center py-16">

<h2 className="text-3xl font-bold mb-4">
Looking for livestock availability today?
</h2>

<a
href="https://wa.me/265999145003"
className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold"
>
Chat With Us
</a>

</div>

</div>

)

}

export default Animals