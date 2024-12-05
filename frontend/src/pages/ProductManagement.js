import React, {useEffect, useState} from 'react'
import Sidebar from '../components/sidebar'
import PrdBox from '../components/PrdBox';
import PrdSearch from '../components/PrdSearch'

function ProductManagement() {
    const [prdBx, setPrdBx] = useState(false);

    return (

        <div class="relative">
            {prdBx && <PrdBox closePrdBx={()=> 
                setPrdBx(false)
            }/>}
            <Sidebar/>
        
            <div class="leading-loose relative top-20 left-24">
                <h2 class="text-4xl font-semibold">Product Inventory</h2>
                <p class="text-xl">Track and manage your product inventory here.</p>
            </div>
            
            <div class="relative">
                <button class="absolute top-24.5 right-20 z-10 text-white bg-compblue rounded-xl px-4 py-2 transform hover:scale-105 hover:shadow-2xl hover:shadow-compblue/50" onClick={() => setPrdBx(true)}>+ Create Product</button>
                <div class="relative top-24.5 left-24"><PrdSearch /></div>
            </div>
            <div class = "overflow-hidden rounded-lg dark:border-outline ">
                <table class = "border-lightsilver border-seperate absolute top-80 left-24 min-w-[88vw]">
                    <thead class="bg-lightsilver">
                        <tr>
                            <th class="rounded-tl-lg rounded-bl-lg px-4 py-2 font-medium text-left text-compgray">Product SKR</th>
                            <th class="px-4 py-2 font-medium text-left text-compgray">Product Name</th>
                            <th class="px-4 py-2 font-medium text-left text-compgray">Created</th>
                            <th class="rounded-tr-lg rounded-br-lg px-4 py-2 font-medium text-left text-compgray">Employee</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-compgray/50">
                        <tr>
                            <td class="rounded-tl-lg rounded-bl-lg px-4 py-3 text-sm font-medium">#PN-1234</td>
                            <td class="px-4 py-3 text-sm font-medium">Smart Wi-Fi Enabled Thermostat</td>
                            <td class="px-4 py-3 text-sm font-medium">May 4, 2024</td>
                            <td class="px-4 py-3 text-sm font-medium">Emily Clarke</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-3 text-sm font-medium">#PN-5678</td>
                            <td class="px-4 py-3 text-sm font-medium">Multi-Function Smart Home Security Camera</td>
                            <td class="px-4 py-3 text-sm font-medium">March 5, 2023</td>
                            <td class="px-4 py-3 text-sm font-medium">Sarah Johnson</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-3 text-sm font-medium">#PN-5678</td>
                            <td class="px-4 py-3 text-sm font-medium">Compact Portable Solar Power Bank</td>
                            <td class="px-4 py-3 text-sm font-medium">Sept 29, 2024</td>
                            <td class="px-4 py-3 text-sm font-medium">Olivia Martinez</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-3 text-sm font-medium">#PN-5678</td>
                            <td class="px-4 py-3 text-sm font-medium">Wireless Bluetooth Noise Cancelling Headphones</td>
                            <td class="px-4 py-3 text-sm font-medium">Jan 11, 2023</td>
                            <td class="px-4 py-3 text-sm font-medium">James Thompson</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
  

export default ProductManagement
