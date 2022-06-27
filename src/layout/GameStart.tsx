import React, { useEffect, useState } from "react";
import Answer from "../components/Answer";
import BadgePoint from "../components/BadgePoint";
import QuestionTitle from "../components/QuestionTitle";
import { IAnswer } from "../components/Answer";
import BottonAnswer from "../components/BottonAnswer";
import { Socket } from "socket.io-client";
import { IGameQOut, Peserta, User } from "../App";

type GameStartProps = {
  socket: Socket;
  user: User;
  peserta: Peserta[];
  listJawaban: IAnswer[];
  gameState: boolean;
  handleSoal: (game: IGameQOut) => void;
  soal: string | undefined;
};

function showTeamName(peserta: Peserta[], team: string): string {
  const pesertaname = peserta.find(kel => kel.team === team)?.username;
  if (pesertaname) {
    return pesertaname;
  }
  return "...";
}

function showTeamPoint(peserta: Peserta[], team: string): number {
  const pesertaPoint = peserta.find(kel => kel.team === team)?.point;
  if (pesertaPoint) {
    return pesertaPoint;
  }
  return 0;
}

const GameStart: React.FC<GameStartProps> = ({
  socket,
  user,
  peserta,
  listJawaban,
  handleSoal,
  gameState,
  soal,
}) => {
  const [userTeam, setUserTeam] = useState<User>({} as User);

  useEffect(() => {
    socket.on("denger-jawab", userTeam => {
      setUserTeam(userTeam);
      console.log("userjawab: ", userTeam);
    });
  }, [socket]);

  const handleJawab = () => {
    console.log("kepijit jawab!");
    if (userTeam.username) {
      console.log("pijit!");
      socket.on("jawab", (userTeam: User) => {
        setUserTeam(userTeam);
        console.log("hasil-pijit!: ", userTeam);
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center  w-full md:w-2/3 h-screen mx-auto px-5 ">
      <div className="container flex flex-row justify-center items-center h-1/6  ">
        <div className="flex flex-row justify-around w-full gap-5 mx-3">
          <div className="text-base font-semibold uppercase w-full">
            <BadgePoint title={showTeamName(peserta, "teamA")}>
              team A : {showTeamPoint(peserta, "teamA")}
            </BadgePoint>
          </div>
          <div className="text-base font-semibold uppercase w-full">
            <BadgePoint title={showTeamName(peserta, "teamB")}>
              team B : {showTeamPoint(peserta, "teamB")}
            </BadgePoint>
          </div>
        </div>
      </div>
      <div className="container flex flex-col item-center justify-around w-full px-3 h-4/6 ">
        <div className="h-full">
          <div className="flex item-center justify-around w-full h-2/6 py-3">
            <QuestionTitle gameState={gameState}>
              {soal ? soal : "Mari berisap-siap..."}
            </QuestionTitle>
          </div>
          <div className="flex item-center justify-around w-full h-4/6">
            <div className="w-full bg-white bg-opacity-70 rounded-xl overflow-y-scroll overflow-hidden">
              {gameState && <Answer listAnswers={listJawaban} />}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-1/6 ">
        {!gameState && user.username === "ADMIN" && (
          <BottonAnswer enable socket={socket} handleSoal={handleSoal}>
            {gameState ? "Jawab!" : "Mulai!"}
          </BottonAnswer>
        )}
        {gameState && user.username !== "ADMIN" && !userTeam.username && (
          <BottonAnswer
            enable={userTeam.username !== user.username}
            socket={socket}
            handleSoal={handleJawab}
          >
            Jawab!
          </BottonAnswer>
        )}
      </div>
    </div>
  );
};

export default GameStart;
