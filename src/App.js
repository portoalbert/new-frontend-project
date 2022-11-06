import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [currentId, setCurrentID] = useState();
  const [newBook, setNewBook] = useState(true);
  const [newData, setNewData] = useState({
    name: "",
    author: "",
    pages: "",
  });
  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/items");
    // fetch
    // axios
    const data = await response.json();
    setData(data.items);
    setCurrentID(data.items.length);
  };
  // Delete
  const deleteData = async (id) => {
    const res = await fetch(`http://localhost:8080/item/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setData(data.items);
    console.log(data);
  };
  function popToggle() {
    if (newBook === true) {
      setNewBook(false);
    } else setNewBook(true);
  }
  //Post (CREATE)
  async function postData() {
    newData.id = currentId + 1;
    popToggle();
    // Send data to the backend via POST
    await fetch("http://localhost:8080/item/", {
      // Enter your IP address here
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData), // body data type must match "Content-Type" header
    });
    fetchData();
  }
  //PUT
  async function editData(id) {
    const filter = data.filter((item) => item.id === id);
    const putData = filter[0];
    putData.name = "Editted";

    await fetch(`http://localhost:8080/item/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(putData),
    });
    fetchData();
    console.log(putData);
  }

  function handle(e) {
    e.preventDefault();
    console.log(e.target);
    const tempNewData = { ...newData };
    tempNewData[e.target.id] = e.target.value;
    tempNewData.id = currentId;
    setNewData(tempNewData);
    console.log(newData);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="header">
        <h1>Library</h1>
      </div>
      {newBook ? (
        <div style={{ padding: 20 }} className="mainwrapper">
          <div className="display">
            {data.map((item) => (
              <div key={item.id} style={{ marginBottom: 10 }} className="book">
                <span>
                  Name: <b>{item.name}</b>
                </span>
                <span>
                  Author: <b>{item.author}</b>
                </span>
                <span>
                  Pages: <b>{item.pages}</b>
                </span>
                <div className="buttons">
                  <button
                    type="button"
                    onClick={() => deleteData(item.id)}
                    style={{ marginLeft: 20 }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => editData(item.id)}
                    style={{ marginLeft: 20 }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => popToggle()}>
            New Book
          </button>
        </div>
      ) : (
        <div className="mainpop">
          <div className="popup" onSubmit={(e) => postData(e)}>
            <form className="form">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => handle(e)}
                  value={newData.name}
                />
              </div>
              <div>
                <label>Author</label>
                <input
                  type="text"
                  id="author"
                  onChange={(e) => handle(e)}
                  value={newData.author}
                />
              </div>
              <div>
                <label>Pages</label>
                <input
                  type="number"
                  id="pages"
                  onChange={(e) => handle(e)}
                  value={newData.pages}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
