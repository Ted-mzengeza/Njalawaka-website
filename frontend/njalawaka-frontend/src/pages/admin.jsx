import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Tractor, PawPrint, LogOut } from "lucide-react";

function Admin() {

  const navigate = useNavigate();

  const [section,setSection] = useState("products");

  const [products,setProducts] = useState([]);
  const [equipment,setEquipment] = useState([]);
  const [animals,setAnimals] = useState([]);

  const [category,setCategory] = useState("seed");

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState(null);
  const [price,setPrice] = useState("");

  const [editingId,setEditingId] = useState(null);

  useEffect(()=>{

    if(localStorage.getItem("admin") !== "true"){
      navigate("/login");
    }

    loadProducts();
    loadEquipment();
    loadAnimals();

  },[]);

  const loadProducts = () => {
    fetch("http://njalawaka-agri-and-general-dealers.onrender.com/products")
      .then(res=>res.json())
      .then(data=>setProducts(data));
  };

  const loadEquipment = () => {
    fetch("http://njalawaka-agri-and-general-dealers.onrender.com/equipment")
      .then(res=>res.json())
      .then(data=>setEquipment(data));
  };

  const loadAnimals = () => {
    fetch("http://njalawaka-agri-and-general-dealers.onrender.com/animals")
      .then(res=>res.json())
      .then(data=>setAnimals(data));
  };

  const getEndpoint = () => {
    if(section === "products") return "products";
    if(section === "equipment") return "equipment";
    if(section === "animals") return "animals";
  };

  const reloadData = () => {
    if(section === "products") loadProducts();
    if(section === "equipment") loadEquipment();
    if(section === "animals") loadAnimals();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name",name);
    formData.append("description",description);

    if(price){
      formData.append("price",price);
    }

    if(section === "products"){
      formData.append("category",category);
    }

    if(image){
      formData.append("image",image);
    }

    const endpoint = getEndpoint();

    if(editingId){
      await fetch(`https://njalawaka-agri-and-general-dealers.onrender.com/${endpoint}/${editingId}`,{
        method:"PUT",
        body:formData
      });
      alert("Updated ✅");
      setEditingId(null);
    }else{
      await fetch(`https://njalawaka-agri-and-general-dealers.onrender.com/${endpoint}`,{
        method:"POST",
        body:formData
      });
      alert("Added ✅");
    }

    setName("");
    setDescription("");
    setImage(null);
    setPrice("");

    reloadData();
  };

  const deleteItem = async (id) => {
    const endpoint = getEndpoint();

    await fetch(`http://njalawaka-agri-and-general-dealers.onrender.com/${endpoint}/${id}`,{
      method:"DELETE"
    });

    reloadData();
  };

  const editItem = (item) => {
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price || "");
    setEditingId(item.id);
  };

  const getItems = () => {
    if(section === "products") return products;
    if(section === "equipment") return equipment;
    if(section === "animals") return animals;
  };

  const tabs = [
    { key:"products", label:"Products", icon:<Package size={18}/> },
    { key:"equipment", label:"Equipment", icon:<Tractor size={18}/> },
    { key:"animals", label:"Animals", icon:<PawPrint size={18}/> }
  ];

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-green-700">
          Admin Dashboard 🌾
        </h1>

        <button
          onClick={()=>{
            localStorage.removeItem("admin");
            navigate("/login");
          }}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18}/> Logout
        </button>

      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-8">
        {tabs.map(tab=>(
          <button
            key={tab.key}
            onClick={()=>setSection(tab.key)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition 
            ${section === tab.key 
              ? "bg-green-700 text-white shadow-lg" 
              : "bg-white text-gray-700 hover:bg-green-100"}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-1 backdrop-blur-xl bg-white/70 p-6 rounded-2xl shadow-xl border"
        >
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Update Item ✏️" : "Add New Item ➕"}
          </h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            className="w-full border p-3 rounded-lg mb-3"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
            className="w-full border p-3 rounded-lg mb-3"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="w-full border p-3 rounded-lg mb-3"
          />

          {section === "products" && (
            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="w-full border p-3 rounded-lg mb-3"
            >
              <option value="seed">Seed</option>
              <option value="grain">Grain</option>
            </select>
          )}

          <input
            type="file"
            onChange={(e)=>setImage(e.target.files[0])}
            className="mb-4"
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
          >
            {editingId ? "Update" : "Add Item"}
          </button>
        </form>

        {/* ITEMS */}
        <div className="md:col-span-2 grid md:grid-cols-2 gap-6">

          {getItems()?.map(item=>(
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >

              {item.image && (
                <img
                  src={`https://njalawaka-agri-and-general-dealers.onrender.com/uploads/${item.image}`}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-5">

                <h3 className="text-lg font-bold text-green-700">
                  {item.name}
                </h3>

                <p className="text-gray-600 text-sm mb-2">
                  {item.description}
                </p>

                {item.price && (
                  <p className="text-green-600 font-semibold mb-2">
                    MWK {item.price}
                  </p>
                )}

                {item.category && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                )}

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={()=>editItem(item)}
                    className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={()=>deleteItem(item.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default Admin;