import React from 'react'

const PrdBox = (closePrdBx) => {
  return (
    //container for model
    <div class='fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center'> 
      <div class="rounded-lg p-8 bg-white w-[25em]"> 
        <form>
          <div class="leading-tight">
            <h2 class="px-3 text-xl font-medium">Enter Product Information</h2>
            <p class="px-3 text-sm font-regular text-compgray">Add Your Product Details</p>
          </div>
          <div class="px-3 py-2 ">
            <label>Product SKR</label>
            <input class="border-2 border-lightsilver placeholder-slate-400"></input>
          </div>
          <div class="px-3 py-2">
            <label>Product Name</label>
            <input class="border-2 border-lightsilver placeholder-lightsilver"></input>
          </div>
          <div class="px-3 py-2">
            <label>Create Date</label>
            <input class="border-2 border-lightsilver placeholder-lightsilver"></input>
          </div>
          <div class="px-3 py-2">
            <label> Employee Name </label>
            <input class="border-2 border-lightsilver placeholder-lightsilver"></input>
          </div>
          <div class="relative py-4">
            <button class="absolute right-5 mr-20 px-4 py-1 border-1 border-compblue text-compblue rounded-xl transform hover:scale-105" 
            onClick={closePrdBx}>
              cancel 
            </button>
            <button type='submit' class="absolute right-0 text-white bg-compblue rounded-xl px-4 py-1 transform hover:scale-105 hover:shadow-2xl">Enter</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PrdBox
