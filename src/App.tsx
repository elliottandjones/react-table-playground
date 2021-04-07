import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { formatDateTime } from "./utils";

export interface ITable {
  id: number;
  text: string;
  date: string;
  complete: boolean;
}

function App() {
  const [showAddTable, setShowAddTable] = useState(false);
  const [tables, setTables] = useState([
    {
      id: 1,
      taxt: "this is some text",
      date: formatDateTime(),
      complete: true, 
    }
  ]);

  useEffect(() => {
    const getTables = async () => {
      const tablesFromServer = await fetchTables();
      setTables(tablesFromServer);
    };

    getTables();
  }, []);

  // Fetch all tables
  const fetchTables = async (): Promise<any> => {
    const result = await fetch("http://localhost:5050/tables");
    const data = await result.json();
    return data;
  };
  // Fetch a single table
  const fetchTable = async (id: number): Promise<any> => {
    const result = await fetch(`http://localhost:5050/tables/${id}`);
    const data = await result.json();
    return data;
  };
  // Add table
  const addTable = async (table: ITable): Promise<void> => {
    // const newtable = { ...table, id: UUID() };
    // settables([...tables, newtable]);
    const result = await fetch("http://localhost:5050/tables", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(table),
    });

    const data = await result.json();

    setTables([...tables, data]);
  };
  // Delete table
  const deleteTable = async (id: number): Promise<void> => {
    await fetch(`http://localhost:5050/tables/${id}`, {
      method: "DELETE",
    });
    setTables(tables.filter((table) => table.id !== id));
  };
  return (
    <main className="App">
      <Router>
        <header>

        </header>
        <Route path="/" exact>
          <h2>Hello World</h2>
        </Route>
        <Route path="/">
          <h2>404</h2>
        </Route>
      </Router>
    </main>
  );
}

export default App;
