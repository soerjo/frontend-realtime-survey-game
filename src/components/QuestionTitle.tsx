import React from "react";

type QuestionTitleProps = {
  children?: React.ReactNode;
  gameState: boolean;
};

const QuestionTitle: React.FC<QuestionTitleProps> = ({
  children,
  gameState,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg w-full overflow-y-hiden">
      <div className="flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 z-20 ">
        <div className="flex flex-col ">
          {gameState && (
            <h3 className="text-lg font-extrabold text-black dark:text-white sm:text-xl  w-full">
              Question
            </h3>
          )}
          <h2 className="sm:text-3xl text-2xl text-indigo-700 font-extrabold  dark:text-white w-full">
            {children ? children : "..."}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default QuestionTitle;
