import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkillBoxSkeleton = () => {
  return (
    <div className="box-container ">
      <div className="inner-container flex justify-between gap-4">

        {/* Left Content */}
        <div className="description flex-1">

          {/* User row */}
          <div className="flex items-center mb-3">
            <Skeleton circle width={30} height={30} />
            <div className="ml-2">
              <Skeleton width={50} height={16} />
            </div>
          </div>

          {/* Skill title */}
          <Skeleton height={24} width="70%" className="mb-3" />

          {/* Description */}
          <Skeleton count={3} width={"80%"} height={14} className="mb-2" />

          {/* Buttons */}
          <div className="flex gap-3 mt-5">
            <Skeleton width={80} height={32} />
            <Skeleton width={80} height={32} />
          </div>
        </div>

        {/* Image */}
        <div className="Box-image h-[200px] w-[200px]">
          <Skeleton height={200} width={300} />
        </div>
      </div>
    </div>
  );
};

export default SkillBoxSkeleton;