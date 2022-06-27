import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { Peserta, User } from "../App";
import { guidGenerator } from "../utils/stringGenerator";

type Join = {
  groupName: string;
  roomId: string;
};

type LoginProps = {
  socket: Socket;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setPeserta: React.Dispatch<React.SetStateAction<Peserta[]>>;
};

const Login: React.FC<LoginProps> = ({ setUser, setPeserta, socket }) => {
  const [groupJoint, setGroupJoint] = useState<Join>({
    groupName: "",
    roomId: "",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setGroupJoint(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { groupName, roomId } = groupJoint;
    if (groupName !== "" && roomId !== "") {
      socket.emit(
        "loggin",
        {
          user: groupName,
          roomid: roomId,
        },
        ({ users, myid, team }: any) => {
          setPeserta([...users]);
          setUser({
            username: groupName,
            userid: myid,
            roomid: roomId,
          });
        }
      );
    }
  };

  const handleCreate = () => {
    setGroupJoint({
      groupName: "ADMIN",
      roomId: guidGenerator(),
    });
  };

  return (
    <div className="w-full h-screen font-sans bg-cover bg-landscape z-10 mx-8">
      <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            <form
              className="max-w-sm p-10 m-auto bg-white bg-opacity-70 rounded-lg shadow-sm"
              onSubmit={handleSubmit}
            >
              <p className="mb-8 text-2xl font-bold text-center text-indigo-600 uppercase">
                Join Family 100
              </p>
              <div className="mb-2">
                <div className=" relative ">
                  <input
                    value={groupJoint.groupName}
                    type="text"
                    name="groupName"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="group name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-2">
                <div className=" relative ">
                  <input
                    value={groupJoint.roomId}
                    type="text"
                    name="roomId"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="roomId"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  type="submit"
                  className="uppercase py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Join
                </button>
              </div>
              <div className="flex items-center justify-between mt-1">
                <button
                  onClick={handleCreate}
                  type="button"
                  className="uppercase py-2 px-4  transition ease-in duration-200 rounded-lg hover:bg-indigo-700 hover:text-white border-2 border-indigo-600 focus:outline-none text-indigo-600 w-full"
                >
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
