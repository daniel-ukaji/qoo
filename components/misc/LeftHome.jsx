import React from 'react'

function LeftHome() {
  return (
    <div className='p-16'>
            <div className='flex flex-shrink mb-20'>
                    <h1 className='bg-[#EAECF0] px-5 py-2 rounded'>Exit</h1>
            </div>
            <div className="space-y-5">
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <label for="bordered-radio-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Rental unit</label>
                    <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                </div>
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <label for="bordered-radio-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Condo</label>
                    <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                </div>
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <label for="bordered-radio-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Serviced apartment</label>
                    <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                </div>
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <label for="bordered-radio-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Others</label>
                    <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                </div>

                <div className='pt-16'>
                    <button className='py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200'>Proceed</button>
                </div>
            </div>
        </div>
  )
}

export default LeftHome