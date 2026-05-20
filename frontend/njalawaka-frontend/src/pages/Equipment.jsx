import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Equipment() {

const [equipment,setEquipment]=useState([]);

useEffect(()=>{

fetch("https://njalawaka-agri-and-general-dealers.onrender.com/equipment")

.then(res=>res.json())

.then(data=>setEquipment(data))

.catch(err=>console.log(err));

},[]);



return(

<div className="min-h-screen bg-gray-50">
<Navbar />


{/* HERO HEADER */}

<section
className="relative text-white text-center py-32 px-6"
style={{
backgroundImage:"url('/images/equipment-bg.jpg')",
backgroundSize:"cover",
backgroundPosition:"center"
}}
>

<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-green-900/70"></div>

<div className="relative z-10">

<h1 className="text-5xl md:text-6xl font-bold mb-4">
Farm Equipment Hire
</h1>

<p className="text-lg opacity-90">
Reliable machinery to increase your farm productivity
</p>

</div>

</section>



{/* TRUST STRIP */}

<section className="bg-white shadow-sm">

<div className="max-w-6xl mx-auto py-6 flex flex-wrap justify-center gap-6 text-center text-green-700 font-semibold">

<span>✔ Tractors Available</span>

<span>✔ Experienced Operators</span>

<span>✔ Affordable Hire Rates</span>

<span>✔ Fast Booking Support</span>

</div>

</section>



{/* EQUIPMENT GRID */}

<section className="max-w-6xl mx-auto px-6 py-16 md:py-20">

<h2 className="text-4xl font-bold text-center text-green-800 mb-14">

Available Equipment

</h2>


{equipment.length === 0 ? (

<p className="text-center text-gray-500">
Equipment listings will appear here soon.
</p>

):(


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

{equipment.map(item=>(

<div
key={item.id}
className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden"
>

{item.image && (

<img
src={`https://njalawaka-agri-and-general-dealers.onrender.com/uploads/${item.image}`}
className="h-56 w-full object-cover"
/>

)}


<div className="p-6">

<h3 className="text-xl font-bold text-green-700 mb-2">
{item.name}
</h3>

<p className="text-gray-600 mb-4">
{item.description}
</p>


<a
href={`https://wa.me/265999145003?text=Hello%20I%20want%20to%20hire%20${item.name}`}
target="_blank"
rel="noopener noreferrer"
className="inline-block bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full transition"
>

Hire via WhatsApp

</a>

</div>

</div>

))}

</div>

)}

</section>



{/* CTA SECTION */}

<section className="bg-green-700 text-white text-center py-16 md:py-20">

<h2 className="text-4xl font-bold mb-4">

Need Equipment Urgently?

</h2>

<p className="opacity-90 mb-8">

Contact us directly on WhatsApp for quick availability confirmation.

</p>


<a
href="https://wa.me/265999145003"
target="_blank"
rel="noopener noreferrer"
className="bg-white text-green-700 px-10 py-3 rounded-full font-semibold"
>

Chat With Us Now

</a>

</section>



{/* FLOAT BUTTON */}

<a
href="https://wa.me/265999145003"
target="_blank"
rel="noopener noreferrer"
className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg"
>

WhatsApp

</a>


</div>

);

}

export default Equipment;