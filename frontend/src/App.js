import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [newCard, setNewCard] = useState({ title: "", description: "" });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cards")
      .then((response) => setCards(response.data))
      .catch((error) => console.error("Error fetching cards:", error));
  }, []);

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({
      ...newCard,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/cards", newCard)
      .then((response) => {
        setCards([...cards, response.data]);
        setNewCard({ title: "", description: "" });
        setShowPopup(false);
      })
      .catch((error) => console.error("Error adding card:", error));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Abstract | Help Center</div>
        <div>
          <button
            className="bg-gray-800 px-4 py-2 rounded mr-4"
            onClick={() => setShowPopup(true)}
          >
            Add New Card
          </button>
          <button className="bg-gray-800 px-4 py-2 rounded">
            Submit a request
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-wxl mx-auto max-md:p-6 text-center ">
        {/* Search Bar */}
        <div className="mb-8 h-[400px] bg-[#DADBF0] max-w-7l mx-auto my-auto pt-28">
          <h1 className="text-[50px] font-bold mb-4">How can we help?</h1>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Cards */}
        <div className="flex justify-center items-start max-w-4xl flex-wrap mx-auto gap-12">
          {filteredCards.map((card) => (
            <div
              key={card._id}
              className="bg-[#F4F6F8] 1 shadow-md p4 text-left max-w-sm rounded-lg p- h-[209px] w-[360px]"
            >
              <h2 className="font-semibold text-lg border-b p-4 border-black">
                {card.title}
              </h2>
              <hr />
              <p className="text-gray-600 mt-2 p-4">{card.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          {/* Footer Columns */}
          <div>
            <h3 className="font-semibold mb-2">Abstract</h3>
            <ul>
              <li>Branches</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul>
              <li>Blog</li>
              <li>Help Center</li>
              <li>Release Notes</li>
              <li>Status</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Community</h3>
            <ul>
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>Facebook</li>
              <li>Dribbble</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Legal</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-6 text-xs">
          © Copyright 2022 Abstract Studio Design, Inc. All rights reserved
        </p>
      </footer>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add a New Card</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-left font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newCard.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newCard.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
