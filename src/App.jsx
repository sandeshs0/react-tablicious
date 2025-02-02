import "./App.css";

function App() {
  const sampleCoulumns = [
    { headerName: "SN", field: "sn" },
    { headerName: "Date", field: "date" },
    { headerName: "Customer", field: "customer" },
    { headerName: "Address", field: "address" },
    { headerName: "Article", field: "article" },
    { headerName: "Amount", field: "amount" },
  ];

  const sampleData = [
    {
      sn: 1,
      date: "2025-01-01",
      customer: "Sandesh Sapkota",
      address: "Kathmandu",
      article: "Headset",
      amount: "Rs. 2000",
    },
    {
      sn: 2,
      date: "2025-01-05",
      customer: "Jane Smith",
      address: "Pokhara",
      article: "Keyboard",
      amount: "Rs. 1500",
    },
    {
      sn: 3,
      date: "2025-01-10",
      customer: "Mike Johnson",
      address: "Lalitpur",
      article: "Speaker",
      amount: "Rs. 2400",
    },
    {
      sn: 4,
      date: "2025-01-01",
      customer: "John Doe",
      address: "Kathmandu",
      article: "Headset",
      amount: "Rs. 2000",
    },
    {
      sn: 5,
      date: "2025-01-05",
      customer: "Jane Smith",
      address: "Pokhara",
      article: "Keyboard",
      amount: "Rs. 1500",
    },
    {
      sn: 6,
      date: "2025-01-10",
      customer: "Mike Johnson",
      address: "Lalitpur",
      article: "Speaker",
      amount: "Rs. 2400",
    },
  ];

  return (
    <>
      <Tablicious
        data={sampleData}
        columns={sampleCoulumns}
        pageSize={5}
      ></Tablicious>
    </>
  );
}

export default App;
