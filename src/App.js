import "./App.css";
import {useState, useEffect} from "react";

function App() {
  // GET ITEMS FROM LOCAL STORAGE
  const getData = () => {
    const data = JSON.parse(localStorage.getItem("list")); // PARSE changes array to string
    if (data) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return [];
    }
  };
  const [inputVal, setInputVal] = useState("");
  const [inputArr, setInputArr] = useState(getData());
  const [editTodoId, setEditTodoId] = useState(null); // we slect id of the item we want to edit...null because we dont want editing anything at the start.
  const [textEdit, setTextEdit] = useState("");

  // SET ITEMS ON CHANGE IN LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(inputArr)); // Stringify changes string to array
  }, [inputArr]);

  // ON INPUT CHANGE
  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  // ADD ITEMS
  const addItems = () => {
    if (!inputVal && inputVal.length === 0) {
      alert("field Cannot be empty");
    }
    setInputArr([...inputArr, inputVal]); // OR
    // setInputArr([...inputArr].concat(inputVal));
    setInputVal("");
  };

  // DELETE ITEMS
  const deleteItem = (id) => {
    const newArr = inputArr.filter((val, ind) => {
      return id !== ind;
    });
    setInputArr(newArr);
  };

  // DELETE ALL

  const deleteAll = () => {
    setInputArr([]);
  };

  // Submit Edit

  const editTodo = (id) => {
    const updatedTodo = [...inputArr].map((val, ind) => {
      if (ind === id) {
        val = textEdit;
      }
      return val; // will retun every Item but will modify the Todo item with the ID selected first.
    });
    setInputArr(updatedTodo);
    setEditTodoId(null); //Reset our Editing Logic
    setTextEdit("");
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "gray",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <div style={{color: "white", fontSize: "35px", marginBottom: "10px"}}>
        <strong>ToDo App</strong>
      </div>
      <input
        style={{
          margin: "10px",
          borderRadius: "7px",
          width: "15rem",
        }}
        type="text"
        value={inputVal}
        onChange={handleChange}
      />

      <button
        style={{
          margin: "10px",
          borderRadius: "7px",
          backgroundColor: "green",
          color: "white",
        }}
        onClick={addItems}
      >
        Submit
      </button>

      <div>
        <ul>
          {inputArr.map((val, ind) => {
            return (
              <div key={ind}>
                {editTodoId === ind ? (
                  <input
                    style={{
                      margin: "10px",
                      borderRadius: "8px",
                    }}
                    onChange={(e) => setTextEdit(e.target.value)}
                    value={textEdit}
                  />
                ) : (
                  <div
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      width: "90%",
                      height: "2rem",
                    }}
                  >
                    {val}
                  </div>
                )}
                <button
                  style={{
                    backgroundColor: "red",
                    margin: "10px",
                    color: "white",
                    borderRadius: "7px",
                  }}
                  onClick={() => deleteItem(ind)}
                >
                  Delete
                </button>

                {editTodoId === ind ? (
                  <button
                    style={{
                      borderRadius: "7px",
                      margin: "10px",
                      color: "white",
                      backgroundColor: "green",
                    }}
                    onClick={() => {
                      editTodo(ind);
                    }}
                  >
                    Submit Edit
                  </button>
                ) : (
                  <button
                    style={{
                      margin: "10px",
                      borderRadius: "7px",
                      color: "white",
                      backgroundColor: "green",
                    }}
                    onClick={() => setEditTodoId(ind)}
                  >
                    Edit Todo
                  </button>
                )}
              </div>
            );
          })}
        </ul>
        <button
          style={{
            width: "30%",
            backgroundColor: "red",
            color: "black",
            marginBottom: "10px",
            borderRadius: "17px",
          }}
          onClick={deleteAll}
        >
          Delete All
        </button>
      </div>
    </div>
  );
}

export default App;
