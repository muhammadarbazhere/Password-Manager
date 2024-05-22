import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IoMdEyeOff } from "react-icons/io";
import Table from "./Table";

// uuid
import { v4 as uuidv4 } from "uuid";
//

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);

    // alert("show password");
  }

  // function savePassword(e) {
  //   e.preventDefault();
  //   console.log(form);

  //   setform({
  //     site: "",
  //     username: "",
  //     password: "",
  //   });
  // }

  const [passwordArray, setpasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");

    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  function savePassword() {
    
    // setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

    // localStorage.setItem("passwords",
    //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));

    // console.log([...passwordArray, { ...form, id: uuidv4() }]);

  
      const updatedArray = form.id
        ? passwordArray.map((item) => (item.id === form.id ? form : item))
        : [...passwordArray, { ...form, id: form.id || uuidv4() }];

      setpasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      console.log(updatedArray);
      //

      setform({
        site: "",
        username: "",
        password: "",
      });
  }

  //
  //

  function deletePassword(id) {
    let c = confirm("Do you want to delete this password");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));

      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );

      console.log("deleting password with id", id);
    }
  }
  //
  function editPassword(id) {
    console.log("editing password with id", id);

    const passwordToEdit = passwordArray.find((item) => item.id === id);
    if (passwordToEdit) {
      setform(passwordToEdit);
    }
  }

  //

  // function handleChange(e) {
  //   const {name, value} = e.target
  //   setform((prev)=>({
  //     ...prev,
  //     [name]: value
  //   }))
  // }
  function handleChange(e) {
    setform({ ...form, [e.target.name]: [e.target.value] });
  }

  return (
    <div className=" h-full py-10 overflow-hidden">
  
      <div className="mb-0 md:px-40 md:py-16 md:mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-center">
          <span className="text-green-700"> &lt; </span>
          Pass
          <span className="text-green-700">OP/&gt; </span>
        </h1>

        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>

        <form className="flex  flex-col p-4 text-black gap-4 sm:gap-8 items-center">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1 "
            type="text"
            placeholder="Enter website URL"
            name="site"
            id="site"
            value={form.site}
            onChange={handleChange}
            maxLength={6}
            required
          />

          <div className="flex flex-col sm:flex-row w-full justify-between gap-4 sm:gap-8">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1 "
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              maxLength={5}
              required
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-500 w-full p-4 py-1 "
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                maxLength={4}
                required
              />
              <span
                className="absolute right-3 top-1  cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <IoMdEyeOff size={20} style={{ marginTop: "4px" }} />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex w-fit justify-center items-center bg-green-300 hover:bg-green-400 rounded-full px-8 gap-2 py-2 border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>

           <div className="w-full h-auto">
            <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
            {passwordArray.length === 0 && <div>No passwords to show</div>}
            {passwordArray.length !== 0 && (
              <Table
                passwordArray={passwordArray}
                deletePassword={deletePassword}
                editPassword={editPassword}
              />
            )}
          </div> 
        </form>
      </div>
    </div>
  );
};
export default Manager;
