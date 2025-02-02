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
import { Tablicious } from "react-tablicious";

const columns = [
  { field: "name", headerName: "Name" },
  { field: "amount", headerName: "Amount" },
];

const data = [
  { name: "Alice", amount: "Rs. 200" },
  { name: "Bob", amount: "Rs. 150" },
];

export default function App() {
  return <Tablicious data={data} columns={columns} pageSize={10} />;
}
```

## 📜 Props

| Prop       | Type     | Required | Description                                       |
| ---------- | -------- | -------- | ------------------------------------------------- |
| `data`     | `Array`  | ✅       | Data to display in the table.                     |
| `columns`  | `Array`  | ✅       | Column definitions (e.g., `field`, `headerName`). |
| `pageSize` | `Number` | ❌       | Number of rows per page (default: `5`).           |

## Features:

- Search Bar
- Sortable Columns
- Pagination Support
- Easy Integration with TailwindCSS

## 📜 License

This project is licensed under the MIT License.
