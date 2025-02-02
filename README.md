# React-Tablicious

React-Tablicious is a customizable, searchable, and sortable table component for React, built with TailwindCSS.

## 📦 Installation
ss

Install the package using npm:

```bash
npm install react-tablicious
```

## 🚀 Usage:
Import and use the Tablicious Component:

```
import { CustomTable } from "react-tablicious";

const columns = [
  { field: "name", headerName: "Name" },
  { field: "amount", headerName: "Amount" },
];

const data = [
  { name: "Alice", amount: "Rs. 200" },
  { name: "Bob", amount: "Rs. 150" },
];

export default function App() {
  return <CustomTable data={data} columns={columns} />;
}
```

### Features:
- Search Bar
- Sortable Columns
- Pagination Support
- Easy Integration with TailwindCSS