// // import React from 'react';
// // import Link from 'next/link';

// // const Layout = ({ children }) => {
// //   const [isMobile, setIsMobile] = React.useState(false);

// //   React.useEffect(() => {
// //     const handleResize = () => setIsMobile(window.innerWidth < 640);
// //     handleResize();
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   const navigation = (
// //     <nav className="bg-gray-800">
// //       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between h-16">
// //           <div className="flex items-center">
// //             <div className="flex-shrink-0">
// //               <img
// //                 className="h-8 w-8"
// //                 src="/logo.svg"
// //                 alt="Logo"
// //               />
// //             </div>
// //             <div className="hidden md:block">
// //               <div className="ml-10 flex items-baseline space-x-4">
// //                 <Link href="/">
// //                   <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
// //                     Home
// //                   </a>
// //                 </Link>
// //                 <Link href="/about">
// //                   <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
// //                     About
// //                   </a>
// //                 </Link>
// //                 <Link href="/contact">
// //                   <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
// //                     Contact
// //                   </a>
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );

// //   const bottomNavigation = (
// //     <nav className="fixed bottom-0 w-full bg-gray-800">
// //       <div className="flex items-center justify-around max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
// //         <Link href="/">
// //           <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
// //             Home
// //           </a>
// //         </Link>
// //         <Link href="/about">
// //           <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
// //             About
// //           </a>
// //         </Link>
// //         <Link href="/contact">
// //           <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
// //             Contact
// //           </a>
// //         </Link>
// //       </div>
// //     </nav>
// //   );

// //   return (
// //     <div className="flex flex-col min-h-screen">
// //       {isMobile ? bottomNavigation : navigation}
// //       <main className="flex-grow">{children}</main>
// //     </div>
// //   );
// // };

// // export default Layout;

// import { useRef } from 'react';
// import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

// function App() {
//     const tawkMessengerRef = useRef();

//     const handleMinimize () => {
//         tawkMessengerRef.current.minimize();
//     };

//     return (
//         <div className="App">
//             <button onClick={handleMinimize}> Minimize the Chat </button>

//             <TawkMessengerReact
//                 propertyId="property_id"
//                 widgetId="default"
//                 ref={tawkMessengerRef}/>
//         </div>
//     );
// }
