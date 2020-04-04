import React from "react";


const Inventory = () => {


  const handleAddInventory = () => {

    // fetch('http://localhost:4200/addProduct',{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type' : 'application/json'
    //   },
    //   body: JSON.stringify(fakeData)
    // })
    // .then(res => res.json())
    // .then(data => {
    //   console.log("Post Successful", data);
    // })

  }

  return (
    <div>
      <h1>Add inventory to sell more...</h1>
      <button onClick={handleAddInventory} disabled>Add Inventory</button>
    </div>
  );
};

export default Inventory;
