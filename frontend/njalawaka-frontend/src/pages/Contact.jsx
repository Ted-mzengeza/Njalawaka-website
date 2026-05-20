import Navbar from "../components/Navbar";
export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />

      {/* Header */}
      <div className="bg-green-800 text-white text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact Njalawaka Agro
        </h1>
        <p className="max-w-2xl mx-auto opacity-90">
          Have questions about our seeds or equipment? Send us a message and our team will assist you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 p-10">

        {/* Contact Info */}

        <div className="space-y-8">

          <div className="bg-white shadow-lg p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-700 mb-2">📍 Location</h3>
            <p>Lilongwe, Malawi</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-700 mb-2">📞 Phone</h3>
            <p>+265 999 145 003</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-700 mb-2">💬 WhatsApp</h3>
            <a
              href="https://wa.me/265999145003"
              className="text-green-600 font-semibold hover:underline"
            >
              Chat with us on WhatsApp
            </a>
          </div>

        </div>

        {/* Contact Form */}

        <form className="bg-white shadow-xl p-8 rounded-xl space-y-6">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
          ></textarea>

          <button className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition">
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
}