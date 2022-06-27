import React from "react";

export interface IAnswer {
  answer: string;
  point: number;
}

type AnswerProsp = {
  listAnswers: IAnswer[];
};

const Answer: React.FC<AnswerProsp> = ({ listAnswers }) => {
  return (
    <div className="flex flex-col gap-2 ">
      {listAnswers.map((list, index) => {
        return (
          <div key={index} className="border-b-violet-500 border-b-2 w-full ">
            <div className="flex w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 z-20">
              <div className="flex flex-row w-full ">
                <h2 className="text-left text-xl font-extrabold text-indigo-700 sm:text-xl w-1/5 ">
                  {index + 1}.
                </h2>

                <h2 className="text-left text-xl font-extrabold text-indigo-700 sm:text-xl w-3/5 ">
                  {list.answer}
                </h2>
                <h2 className="text-center text-xl font-extrabold text-indigo-700 sm:text-xl w-1/5 ">
                  {list.point}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Answer;
