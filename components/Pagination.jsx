 

const Pagination = ({page, pageSize, totalItems, onPageChange1}) => {

    const totalPages = Math.ceil(totalItems / pageSize)

const handlePageChange2 = (newPage2) => {
    if( newPage2 >=1 && newPage2 <= totalPages) { // we dont wanna go to a page that does not exist
       onPageChange1(newPage2) 
       console.log('page-Pagination-L10', page)    
       console.log('newPage2-Pagination-L10', newPage2)    
    }
}

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button 
        className="mr-2 px-2 py-1 border border-gray-300 rounded bg-yellow-100"
        disabled={page === 1}
        onClick={()=> handlePageChange2(page - 1)}
      >
        Previous
      </button>
      <span className='mx-2'>
        Page {page} of  {totalPages}
      </span>
      <button
        className='ml-2 px-2 py-1 border border-gray-300 rounded bg-yellow-100'
        disabled={page === totalPages}
        onClick={()=> handlePageChange2(page + 1)}
        >
        Next
      </button>
    </section>
  )
}

export default Pagination