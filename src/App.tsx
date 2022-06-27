import Login from "./layout/Login";
import Default from "./layout/Default";
import GameStart from "./layout/GameStart";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IAnswer } from "./components/Answer";

export type User = {
  username: string;
  userid: string;
  roomid: string;
};

export type Peserta = {
  username: string;
  team: string;
  point: number;
};

export interface IGameQOut {
  quest: string;
  answers: string[];
  points: number[];
}
const socket = io("http://localhost:5000");

const listAnswer: IAnswer[] = [
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
  {
    answer: "burung",
    point: 20,
  },
];

function App() {
  const [user, setUser] = useState<User>();
  const [peserta, setPeserta] = useState<Peserta[]>([]);
  const [soal, setSoal] = useState<string>();
  const [jawaban, setJawaban] = useState(listAnswer);
  const [gameState, setGameState] = useState(false);

  useEffect(() => {
    socket.on("user-loggin", (users: any) => {
      console.log("listen socket", users);
      setPeserta(users);
    });

    socket.on("start", (game: IGameQOut) => {
      console.log("game mulai!");
      setGameState(true);
      handleSoal(game);
    });

    console.log("peserta: ", peserta);
    console.log("users: ", user);
  }, [peserta, user]);

  const handleSoal = (game: IGameQOut) => {
    const { quest, answers, points } = game;
    setSoal(quest);
    const a: IAnswer[] = [];
    answers.forEach((ans, index) => {
      a.push({
        answer: answers[index],
        point: points[index],
      });
    });
    setJawaban(a);
  };

  return (
    <Default>
      {user ? (
        <GameStart
          socket={socket}
          user={user}
          peserta={peserta}
          listJawaban={jawaban}
          gameState={gameState}
          handleSoal={handleSoal}
          soal={soal}
        />
      ) : (
        <Login socket={socket} setUser={setUser} setPeserta={setPeserta} />
      )}
    </Default>
  );
}

export default App;
