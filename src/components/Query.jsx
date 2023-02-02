import React, { useState } from "react";
import Close from "../assets/Close button.png";
import Delete from "../assets/bin.png";

const Query = () => {
  const [inputs, setInputs] = useState([["", "", ""]]);
  const [and_or, setAnd_or] = useState("&&");
  const [query, setQuery] = useState("");

  const addInputs = () => {
    setInputs([...inputs, ["", "", ""]]);
  };

  const deleteInputs = (index) => {
    setInputs(
      inputs.filter((i, ind) => {
        return ind !== index;
      })
    );
  };

  const updateState = (row, index, val) => {
    let oldState = inputs;
    oldState[row][index] = val;
    setInputs(oldState);
  };
  // console.log(inputs);

  const queryString = () => {
    let q = "";

    inputs.forEach((i, index) => {
      // console.log(index+" : "+i);
      if (index === inputs.length - 1 || inputs.length === 1)
        q += `(field.${i[0]}) ${i[1]} \\'${i[2]}\\'`;
      else q += `(field.${i[0]}) ${i[1]} \\'${i[2]}\\' ${and_or} `;
      setQuery(q);
    });
    // console.log(query+": "+ inputs);
  };

  return (
    <div className="modal rounded-md bg-[#1D2025] text-[#FFFFFF] m-20">
      <header className="bg-[#5C61F0] p-5 flex content-center justify-between rounded-t-md">
        <div className="left w-screen">
          <p className="text-[18px]">Create tag and query</p>
          <div className="bg-[#4338CA] text-[#FFFFFF] text-[14px] p-2 mt-2 rounded">
            {query === ""
              ? "The query you build will be saved here"
              : "Query: " + query}
          </div>
        </div>
        <div className="right cursor-pointer">
          <img src={Close} alt="Close" />
        </div>
      </header>

      <div className="query bg-[#282B30] m-10 mt-[150px] p-5 text-[14px] rounded-md">
        <div className="box flex mb-3">
          <span
            className={`p-1 ${
              and_or === "&&" ? "active" : ""
            } px-3 rounded-l-md cursor-pointer`}
            onClick={() => setAnd_or("&&")}
          >
            AND
          </span>
          <span
            className={`p-1 ${
              and_or === "||" ? "active" : ""
            } px-3 rounded-r-md cursor-pointer`}
            onClick={() => setAnd_or("||")}
          >
            OR
          </span>
        </div>
        {inputs.map((e, index) => (
          <div className="querybuilder flex items-end my-2" key={index}>
            <form className="mr-3">
              <label className="text-[12px]">Field</label>
              <br />
              <select
                name="field"
                id="field"
                className="bg-[#404348] my-1 w-[250px] p-1 rounded cursor-pointer"
                onChange={(e) => updateState(index, 0, e.target.value)}
              >
                <option selected disabled hidden>
                  Select field
                </option>
                <option value="theme">Theme</option>
                <option value="sub_theme">Sub-theme</option>
                <option value="reason">Reason</option>
                <option value="language">Language</option>
                <option value="source">Source</option>
                <option value="rating">Rating</option>
                <option value="time_period">Time Period</option>
                <option value="customer_id">Customer ID</option>
              </select>
            </form>
            <form className="mr-3">
              <label className="text-[12px]">Condition</label>
              <br />
              <select
                name="condition"
                id="condition"
                className="bg-[#404348] my-1 w-[250px] p-1 rounded cursor-pointer"
                onChange={(e) => updateState(index, 1, e.target.value)}
              >
                <option selected disabled hidden>
                  Select condition
                </option>
                <option value="==">Equals</option>
                <option value="!=">Does not equal</option>
                <option value=">=">Greater than equal</option>
                <option value="<=">Less than equal</option>
                <option value="like">Like</option>
                <option value="not like">Not like</option>
                <option value="is empty">Is Empty</option>
                <option value="is">Is</option>
                <option value="is not">Is not</option>
                <option value="contains">Contains</option>
              </select>
            </form>
            <form className="mr-3">
              <label className="text-[12px]">Criteria</label>
              <br />
              <select
                name="criteria"
                id="criteria"
                className="bg-[#404348] my-1 w-[250px] p-1 rounded cursor-pointer"
                onChange={(e) => updateState(index, 2, e.target.value)}
              >
                <option selected disabled hidden>
                  Select criteria
                </option>
                <option value="Offers">Offers</option>
                <option value="Performance">Performance</option>
                <option value="Platform">Platform</option>
                <option value="Product Feedback">Product Feedback</option>
              </select>
            </form>
            {index !== 0 && (
              <div
                className="delete bg-[#404348] p-2 rounded cursor-pointer"
                onClick={() => deleteInputs(index)}
              >
                <img src={Delete} alt="Delete" width={"20px"} height="10px" />
              </div>
            )}
          </div>
        ))}
        <button
          className="bg-[#0ab766] rounded-md py-2 px-4 mr-2 font-medium"
          onClick={queryString}
        >
          Build
        </button>
        <button
          className="my-2 bg-[#4F46E5] rounded-md py-2 px-4 font-medium"
          onClick={addInputs}
        >
          + Add filter
        </button>
      </div>
      <button className="my-2 bg-[#4F46E5] mx-10 mt-[-8px] rounded-md py-2 px-4">
        + Add new group filter
      </button>

      <footer className="flex justify-between p-4 mt-8">
        <button className="my-2 bg-[#6D7175] rounded-md py-2 px-4">
          Cancel
        </button>
        <button className="my-2 bg-[#4F46E5] rounded-md py-2 px-4">
          Finish
        </button>
      </footer>
    </div>
  );
};

export default Query;
