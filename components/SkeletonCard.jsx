import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonCard({cards}) {
  return (
    Array(cards).fill(0).map(item => <div className="font-sora w-[14rem] xl:w-[15rem] rounded-lg cursor-pointer relative">
    <div className="absolute p-2 bg-[#10182899] top-4 left-4 z-40 rounded-md">
      <h1 className="text-sm font-medium text-white">
        {/* <Skeleton width={50} /> */}
      </h1>
    </div>
    <div className="relative h-[15.688rem] w-full">
      <Skeleton height={250} />
    </div>
    <div>
      <h1 className="mt-4 mb-1 text-sm font-medium text-gray-900">
        <Skeleton width={120} />
      </h1>
      <h1 className="text-xs font-normal text-secondary text-opacity-80">
        <Skeleton width={180} />
      </h1>
      <div className="flex items-center mt-1 space-x-4 text-sm text-secondary text-opacity-80">
        {/* <MdOutlineBed className="w-5 h-5 text-gray-700" /> */}
        <Skeleton width={20} />
        <h1><Skeleton width={40} /></h1>
        {/* <MdOutlineBathtub className="w-5 h-5 text-gray-700" /> */}
        <Skeleton width={20} />
        <h1><Skeleton width={40} /></h1>
      </div>
    </div>
  </div>)
    
  )
}

export default SkeletonCard