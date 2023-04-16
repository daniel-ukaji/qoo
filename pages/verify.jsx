import axios from 'axios';
import { useEffect, useState } from 'react';
import { useApi } from '../utils/hooks/useApi';
import { getPaymentStatus } from '../utils/api/payment/getPaymentStatus';
import { createBooking } from '../utils/api/booking/createBooking';
import { useRouter } from 'next/router';
import { BiErrorCircle } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdPending } from 'react-icons/md';

export default function verify() {
  const router = useRouter()
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const VerifyPayment = useApi(getPaymentStatus);
  const CreateBooking = useApi(createBooking)


  useEffect(() => {
    ( async () => {
    const paymentReference = localStorage.getItem('paymentReference');
    const paymentUrl = localStorage.getItem('paymentUrl');
    const bookingResponse = localStorage.getItem('bookingResponse');
    const urlParams = new URLSearchParams(window.location.search);
    const paymentRef = urlParams.get('reference');

    console.log(paymentRef);
    console.log(bookingResponse);

    const response = await VerifyPayment.request({paymentReference: paymentRef});
    const paymentId = response.data.paymentId;
    console.log(paymentId);
    console.log(response)

    if (response.data.responseCode === '00') { // check if response code is successful
      let bookingResponse = localStorage.getItem('bookingResponse'); // get the booking response from sessionStorage
      bookingResponse = JSON.parse(bookingResponse);
      bookingResponse.bookingPaymentId = paymentId;

      const submitBooking = await CreateBooking.request(bookingResponse); // submit the booking response to the API
    
      console.log(submitBooking); // log the API response to the console
      setPaymentConfirmed(true);
    } else {
      setErrorMessage('Payment failed. Please try again.');
    }
  })();

    // if (paymentReference) {
    //   axios.post('https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/payment/verify-payment', { paymentReference })
    //     .then(response => {
    //       const responseCode = response.data.responseCode;

    //       if (responseCode === '00') {
    //         const bookingResponse = localStorage.getItem('bookingResponse');

    //         if (bookingResponse) {
    //           axios.post('https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/booking/create', JSON.parse(bookingResponse))
    //             .then(response => {
    //               console.log('Booking created successfully:', response.data);
    //               // Other success handling ...
    //             })
    //             .catch(error => {
    //               console.error('Failed to create booking:', error);
    //               // Other error handling ...
    //             });
    //         } else {
    //           console.error('Booking response not found in localStorage.');
    //           // Other error handling ...
    //         }
    //       } else {
    //         console.error('Payment verification failed:', response.data.responseMessage);
    //         // Other error handling ...
    //       }
    //     })
    //     .catch(error => {
    //       console.error('Failed to verify payment:', error);
    //       // Other error handling ...
    //     });
    // } else {
    //   console.error('Payment reference not found in localStorage.');
    //   // Other error handling ...
    // }
  }, []);

  return (
    <div>
      {paymentConfirmed ? (
        <div class="flex flex-col items-center justify-center h-screen font-sora">
            {/* <Image src={done} /> */}
            <AiFillCheckCircle className='w-20 h-20 text-primary' />
            <h1 className='text-2xl font-bold'>Successful</h1>
            <p className='text-sm text-[#667085]'>Your Transaction was successful.</p>
            <button onClick={() => router.push('/bookingsEmpty') } className="px-40 py-2 mt-6 text-xs font-medium text-center text-white rounded-xl bg-primary w-fit">
              Continue
            </button>        
        </div>
      ) : errorMessage ? (
        <div class="flex flex-col items-center justify-center h-screen font-sora">
            {/* <Image src={done} /> */}
            <BiErrorCircle className='w-20 h-20 text-primary' />
            <h1 className='text-2xl font-bold'>Unsuccessful</h1>
            <p className='text-sm text-[#667085]'>{errorMessage}</p>
            <button onClick={() => router.push('/') } className="px-32 xl:px-40 py-2 mt-6 text-xs font-medium text-center text-white rounded-xl bg-primary w-fit">
          Continue
        </button>        
        </div>
      ) : (
        <div class="flex flex-col items-center justify-center h-screen font-sora">
            {/* <Image src={done} /> */}
            <MdPending className='w-20 h-20 text-primary' />
            <h1 className='text-2xl font-bold'>Verifying Payment...</h1>
            {/* <p className='text-sm text-[#667085]'>{errorMessage}</p> */}
            {/* <button onClick={() => router.push('/') } className="px-40 py-2 mt-6 text-xs font-medium text-center text-white rounded-xl bg-primary w-fit">
          Continue
        </button>         */}
        </div>
      )}
      {/* Other verify page content */}
    </div>
  );
}
