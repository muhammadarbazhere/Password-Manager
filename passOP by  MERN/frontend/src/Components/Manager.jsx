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
  }

  const [passwordArray, setpasswordArray] = useState([]);

  //
  async function getPasswords() {
    let req = await fetch("http://localhost:3000/");
    let data = await req.json();
    setpasswordArray(data);
    console.log(data);
  }

  useEffect(() => {
    getPasswords();
  }, []);
  //

  async function savePassword(e) {
    e.preventDefault();

    let res = await fetch("http://localhost:3000/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });

    if (res.ok) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      
      setform({
        site: "",
        username: "",
        password: "",
      });
    } else {
      console.error("Failed to save password, response status:", res.status);
    }
  }

  //
  async function deletePassword(id) {
    console.log("Delete function called with ID:", id); // Log the ID received
    let c = window.confirm("Do you want to delete this password?");
    if (c) {
      try {
        let res = await fetch(`http://localhost:3000/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          setpasswordArray(passwordArray.filter((item) => item._id !== id));
          console.log(`Password with ID ${id} deleted successfully`);
        } else {
          console.log(`Failed to delete password with ID ${id}`);
        }
      } catch (error) {
        console.error("Error deleting password:", error);
      }
    }
  }

  function editPassword(id) {
    console.log("editing password with id", id);

    const passwordToEdit = passwordArray.find((item) => item._id === id);
    if (passwordToEdit) {
      setform(passwordToEdit);
      setpasswordArray(passwordArray.filter(item=>item._id !== id))
    }
  }
 
  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
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
