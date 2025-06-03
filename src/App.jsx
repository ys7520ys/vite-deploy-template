import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{data.shopName}</h1>
      <p>{data.description}</p>
      <img src={data.bannerImage} alt="배너" style={{ width: "100%" }} />
      <ul>
        {data.products.map((item, idx) => (
          <li key={idx}>
            <h3>{item.name}</h3>
            <img src={item.image} alt={item.name} width="150" />
            <p>{item.price.toLocaleString()}원</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;