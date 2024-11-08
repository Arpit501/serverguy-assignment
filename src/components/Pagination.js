import React from 'react'

const Pagination = ({paginationNumbers,handlePagination,page}) => {
  return (
    <div className="mt-2 w-full ">

            {paginationNumbers.map((pageNumber) => (
              <button
                onClick={()=>{handlePagination(pageNumber)}}
                className={pageNumber===page?"bg-orange-300 border border-black px-1 m-2":"border border-black px-1 m-2"}
                key={pageNumber}
              >
                {pageNumber}
              </button>
            ))}
          </div>
  )
}

export default Pagination