import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { IGameQOut } from "../App";
import { ReactComponent as SendIcon } from "../assets/icons/send.svg";

type BootonAnswerProps = {
  children: React.ReactNode;
  socket: Socket;
  handleSoal: (game: IGameQOut) => void;
  enable: boolean;
};

const BottonAnswer: React.FC<BootonAnswerProps> = ({
  socket,
  handleSoal,
  children,
  enable,
}) => {
  const [answer, setAnswer] = useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const handleBottonStart = () => {
    socket.emit("game-start", { answer }, ({ game }: { game: any }) => {
      handleSoal(game);
    });
    console.log("answer");
  };

  return (
    <div className=" block fixed bottom-0 w-full left-1/2 transform -translate-x-1/2 mx-auto h-1/6">
      <div className="flex justify-center items-center h-full w-full  ">
        <div className="container justify-center items-center w-full md:w-2/3">
          <div className="px-8">
            {answer ? (
              <form
                className="w-full flex flex-row gap-2"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  id="answer"
                  className="text-xl rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-5/6"
                  placeholder="Your Answer"
                />
                <button
                  type="submit"
                  className="flex justify-center items-center bg-indigo-700 rounded-lg w-1/6"
                >
                  <div className="h-12 w-12 ">
                    <SendIcon />
                  </div>
                </button>
              </form>
            ) : (
              <button
                type="button"
                disabled={!enable}
                onClick={handleBottonStart}
                className="py-6 px-8 my-5  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-lg  font-bold uppercase shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
              >
                {children}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottonAnswer;
