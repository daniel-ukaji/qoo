import React, { useEffect, useState } from 'react'
import HostHeader from '../components/misc/hostHeader'
import Image from 'next/image'
import Social from '../public/images/Social03.png'
import { useAuth } from '../utils/hooks/useAuth'
import { useApi } from '../utils/hooks/useApi'
import { payout } from '../utils/api/payment/payout'
import { toast } from 'react-toastify'
import ModalComponent from '../components/ModalComponent'
import PayoutComponent from '../components/PayoutComponent'
import Footer from '../components/misc/footer'
import axios from 'axios'
import Head from 'next/head'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';

function Wallet() {

    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [modalActive, setModalActive] = useState(false);
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [transactionStat, setTransactionStat] = useState("");

    const API_ENDPOINT = 'https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/user/read-by-user-id';

    const API_END = 'https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/transaction/read';

    



    const user = useAuth();
    console.log(user.user)

    const userIds = user.user?.userId;

    console.log(user.user?.userWalletBalance)

    const userBalance = user.user?.userWalletBalance;

    const requestBody = {
        userId: userIds
      };

      const requestBod = {
        transactionUserId: userIds
      };

      const propId = process.env.NEXT_PUBLIC_TAWK_PROPERTYID
const widId = process.env.NEXT_PUBLIC_WIDGETID

const tawkMessengerRef = useRef();

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
    };

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.post(API_ENDPOINT, requestBody);
            setBankName(response.data)
            setAccountNumber(response.data)
            console.log(response.data) // assuming that the API response is an object with the user data
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchUserData();
      }, []);

      useEffect(() => {
        const fetchUserDat = async () => {
          try {
            const response = await axios.post(API_END, requestBod);
            setTransactionStat(response.data);
            console.log(response.data) // assuming that the API response is an object with the user data
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchUserDat();
      }, []);

    const formatter = new Intl.NumberFormat("en-US", {
        currency: "USD",
      });

    const payoutApi = useApi(payout);

    const onSubmit = async () => {
        if (amount > Number(userBalance)) {
            setError("Insufficient funds in wallet");
            return;
        }
    
        let req = {
            payoutUserId: userIds,
            payoutAmount: amount,
        }
    
        let id = toast.loading("Please wait while we send your payout request");
    
        const response = await payoutApi.request(req);
    
        console.log(response)
    
        toast.update(id, {
            type: response.data?.responseCode !== "00" ? "error" : "success",
            render: response.data.responseMessage,
            isLoading: payoutApi.loading,
            autoClose: true,
            onClick: () => !payoutApi.errorMessage && toast.dismiss(),
        });
    }
    



  return (
    <div className='font-sora bg-white'>
      <Head>
        <title>QooSpayce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/qoo_logo.png" />
      </Head>
        <HostHeader />

        <TawkMessengerReact
                propertyId= {propId}
                widgetId={widId}
                ref={tawkMessengerRef}/>
        <section className=''>
            <div className='flex flex-col md:flex-row items-center md:items-right justify-between'>
                <h1 className='font-bold text-2xl'>Wallet balance</h1>
                <button onClick={() => {
                        setModalActive(true);
                      }} className='text-[#DB5461]'>Add payout account</button>
            </div>
            <div className='flex flex-col md:flex-row mt-5 space-y-3 md:space-y-0'>
                <div className='border rounded-lg mr-2 w-full md:w-1/2'>
                    <h1 className='mt-14 mb-14 ml-4 font-bold text-center md:text-left text-xl text-gray-500'>₦ {formatter.format(userBalance)}</h1>
                </div>
                <div className='border rounded-lg p-4 mr-2 w-full md:w-1/2'>
                    <p className='mt-5 text-center md:text-left text-xl'>{bankName.userPayoutBankName || "Bank Name Goes Here"}</p>
                    <p className='mt-3 text-center md:text-left text-gray-500'>{accountNumber.userPayoutAccountNumber || "Account Number Goes Here"}</p>
                </div>
            </div>
            <div className='border rounded-lg p-4 mt-10' >
                <h1 className='font-bold'>Request payout</h1>
                <p className='text-gray-500 mb-5'>Your payment is secured by ---</p>
                <p className='font-bold text-sm mb-2'>Enter amount</p>
                <input 
                    className='rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-full placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2'
                    type='text'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder='0.00'
                    pattern="[0-9]*"
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <button onClick={onSubmit} className="px-10 py-4 mt-8 text-sm font-medium text-white rounded-lg bg-primary">
                    Request payout
                </button>
            </div>
            <div className='mt-10'>
                <h1 className='font-bold text-xl mb-5'>Transaction history</h1>
                <div className='border border-gray-200 bg-white flex flex-col items-center justify-center h-full'>
                    
                    {transactionStat.transactionStatus === 'PENDING' ? (
                        <div className='mb-20'>
                            <p>Pending transaction</p>
                        </div>
                    ) : transactionStat.transactionStatus === 'ACTIVE' ? (
                        <div className='mb-20'>
                            <p>Transaction completed</p>
                        </div>
                    ) : (
                        <div className='mb-20'>
                            <div className='flex flex-col items-center justify-center mt-20'>
                                <Image src={Social} alt='' objectFit='contain' className='' />
                                <p>You've not requested for a payout.</p>

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
        <Footer />
        <ModalComponent
      isVisible={modalActive}
      shouldBeBlurAndDarkened
      shouldBeCentered
      onClose={() => setModalActive(false)}
      >
      <PayoutComponent onClick={() => setModalActive(false)} />
      </ModalComponent>
    </div>
  )
}

export default Wallet