import { Tablicious } from 'react-tablicious';

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'amount', headerName: 'Amount' },
];

const data = [
  { name: 'Alice', amount: 'Rs. 200' },
  { name: 'Bob', amount: 'Rs. 150' },
];

export default function App() {
  return <Tablicious data={data} columns={columns} />;
}
