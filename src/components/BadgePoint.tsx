import React from "react";
import logo from "../assets/images/bg_logo.png";

type BadgePointProps = {
  point?: number;
  title: string;
  children: React.ReactNode;
};

const BadgePoint: React.FC<BadgePointProps> = ({ children, title, point }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg w-full relative">
      <img
        src={logo}
        alt="btc logo"
        className="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4"
      />
      <div className="px-4 py-2 sm:p-6">
        <dl>
          <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
            {title}
          </dt>
          <dd className="mt-1 sm:text-3xl leading-9 font-semibold text-gray-900 text-xl ">
            {children}
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default BadgePoint;
