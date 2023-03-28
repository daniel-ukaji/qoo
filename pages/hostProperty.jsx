import React from 'react'
import HostHeader from '../components/misc/hostHeader'
import Link from 'next/link'
import PropertyCard from '../components/PropertyCard'
import Table from '../components/Table'
import Footer from "../components/misc/footer";
import { GrCircleInformation } from 'react-icons/gr'
import EditPage from '../components/EditPage'
import { fetchproperties } from "../utils/api/property/getProperties";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import MultiTable from './MultiTable'
import { useAuth } from '../utils/hooks/useAuth'
import { fetchpropertyHostId, getPropertyHostId } from '../utils/api/property/getPropertyHostId'
import { useApi } from '../utils/hooks/useApi'


function hostProperty() {

    const user = useAuth();
    console.log(user.user)

    const propertyHost = user.user?.userHostId;

    const FetchHostProp = useApi(getPropertyHostId)

    const verifyAllow = user.user?.userStatus

    const {
        data: properties,
        isError,
        error,
        loading,
        setLoading,
      } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchproperties,
        cacheTime: 60000 * 30,
        staleTime: 300000,
      });

    // const {
    //     data: properties,
    //     isError,
    //     error,
    //   } = useQuery({
    //     queryKey: ["post", propertyHostId],
    //     queryFn: () => fetchpropertyHostId(propertyHostId),
    //     cacheTime: 60000 * 30,
    //     staleTime: 30000,
    //   });   


    // const response = await CreateBooking.request(bookingData);

    // const {
    //     data: properties,
    //     isLoading,
    //     isError,
    //     error
    //   } = useQuery(
    //     ['post', propertyHostId],
    //     async () => {
    //         // const response = await FetchHostProp.request()
    //       const res = await fetch("https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/property/read-by-host-id");
    //       if (!res.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       const data = await res.json();
    //       return data;
    //     },
    //     {
    //       cacheTime: 60000 * 30,
    //       staleTime: 30000
    //     }
    //   );
      
    if (properties){

  return (
    <div>
        <HostHeader />

        
        <main className='max-w-[66rem] w-full mx-auto'>
            {verifyAllow === "NOT_VERIFIED" ? (
                <div className='border max-w-[66rem] w-full mx-auto py-3 mt-10 bg-[#FDF7F7]'>
                        <div className='flex justify-center items-center space-x-3'>
                            <GrCircleInformation className='w-5 h-5 text-gray-500' />
                            <p className='font-bold'>Verify your identity by adding  a photo of your ID</p>
                            <Link href="/FirstId" ><p className='bg-gray-200 border py-3 px-3 rounded-md cursor-pointer'>Verify Now</p></Link>
                        </div>
                    </div>                 
            ):(
                null
            )}

                    <div className='flex justify-between max-w-[66rem] w-full mx-auto mt-10'>
                        <p className='font-bold'>Your Listings</p>
                        <p className='text-gray-500'>view all</p>
                    </div>

                    <div className="flex space-x-3 overflow-scroll scrollbar-hide p-5 -ml-3">
                    {properties && properties.map((property) => {
                        // if (property.propertyHostId === propertyHost) {
                        return (
                            <PropertyCard
                                key={property.propertyId}
                                roomAddy={`${property.propertyStreet} ${property.propertyCity}, ${property.propertyState} `}
                                imageUrl={property.propertyImages}
                                numOfBath={property.propertyBathroomNumber}
                                numOfBed={property.propertyBedroomNumber}
                                roomTitle={property.propertyName}
                                roomId={property.propertyId}
                                price={property.propertyBookingPrice}
                            />
                        )
                        // }
                    })}
                    </div>
                        
                        


                    <div className='flex justify-between max-w-[66rem] w-full mx-auto mt-10'>
                        <p className='font-bold text-2xl'>Your Reservations</p>
                    </div>

                    <div className='mt-10 mb-5'>
                        <MultiTable />
                    </div>

        </main>

        {/* <EditPage /> */}

    <Footer />

    </div>
  )
}
}

export default hostProperty

export async function getStaticProps() {
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery(["posts"], fetchproperties);
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  
    //   export const getStaticPaths = async () => {
    //     let properties = [];
    
    //     try {
    //       const response = await fetchproperties();
    //       properties = response;
    //     } catch (error) {
    //       properties = [];
    //     }
    
    //     const paths = properties.map((property) => ({
    //       params: {
    //         propertyHostId: property?.propertyHostId?.toString(),
    //       },
    //     }));
    
    //     return {
    //       paths,
    //       fallback: true,
    //     };
    //   };
  