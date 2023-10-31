import { useState } from "react";
import "./App.css";
import Cell from "./components/Cell";

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const handleActivateCell = (ind) => {
    const newOrder = [...order, ind];
    setOrder(newOrder);
    console.log(newOrder);
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      handleDeactivateCell();
    }
  };

  const handleDeactivateCell = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newOrder;
      });
    }, 300);
  };

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length},1fr)`,
        }}
      >
        {config.flat(1).map((val, ind) => {
          return val ? (
            <Cell
              key={ind}
              filled={order.includes(ind)}
              onClick={() => handleActivateCell(ind)}
              isDisabled={order.includes(ind) || isDeactivating}
            />
          ) : (
            <span />
          );
        })}
      </div>
    </div>
  );
}

export default App;
