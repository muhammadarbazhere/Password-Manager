import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// react tostify part
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//

function Table({ passwordArray, deletePassword, editPassword }) {
  function copyText(text) {
    // react tostify part
    toast("🦄 Text copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    //

    navigator.clipboard.writeText(text);
  }

  return (
    <div className="passwords">
      {/* react tostify part */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      {/*  */}

   
        <table className="table-auto w-full rounded-xl  ">
          <thead className="bg-green-800 text-white ">
            <tr className="text-xs sm:text-lg">
              <th className="py-2">Site</th>
              <th className="py-2">Username</th>
              <th className="py-2">Password</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-green-100">
            {passwordArray.map((item, index) => {
              return (
                <tr key={index} className="text-xs sm:text-lg">
                  <td className="flex items-center justify-center py-2 border border-white text-center gap-2">
                    <a href={item.site} target="_blank">
                      {item.site}
                    </a>

                    <button
                      className="flex items-center cursor-pointer justify-center"
                      onClick={() => {
                        copyText(item.site);
                      }}
                    >
                      <ContentCopyIcon fontSize="10px" />
                    </button>
                  </td>

                  <td className=" py-2 border border-white text-center ">
                    <div className="flex items-center justify-center gap-2">
                      {item.username}
                      <button
                        className="flex items-center cursor-pointer justify-center"
                        onClick={() => {
                          copyText(item.username);
                        }}
                      >
                        <ContentCopyIcon fontSize="10px" />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 border border-white text-center ">
                    <div className="flex items-center justify-center gap-2">
                      {item.password}
                      <button
                        className="flex items-center cursor-pointer justify-center"
                        onClick={() => {
                          copyText(item.password);
                        }}
                      >
                        <ContentCopyIcon fontSize="10px" />
                      </button>
                    </div>
                  </td>

                  {/*  */}

                  <td className="py-2 border border-white text-center ">
                    <span
                      className="cursor-pointer mx-1 text-slate-700"
                      onClick={() => {
                        deletePassword(item.id);
                      }}
                    >
                      <DeleteIcon />
                    </span>

                    <span
                      className="cursor-pointer mx-1 text-slate-700"
                      onClick={() => {
                        editPassword(item.id);
                      }}
                    >
                      <EditIcon />
                    </span>
                  </td>

                  {/*  */}
                </tr>
              );
            })}
          </tbody>
        </table>
    
    </div>
  );
}

export default Table;
