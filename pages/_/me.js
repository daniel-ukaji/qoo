import { useQuery } from "@tanstack/react-query";
import Footer from "../../components/misc/footer";
import Header from "../../components/misc/header";
import { getUserProfile } from "../../utils/api/auth/userProfile";

function Me() {
  const {} = useQuery(["userProfile"], {
    queryFn: async () => await getUserProfile(),
  });
  return (
    <div className="relative font-sora">
      <Header />

      <div className="flex flex-col max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mt-14">
          Account settings
        </h1>

        <div className="mt-4 mb-6 border border-gray-200 " />

        <div>
          <h1 className="text-lg font-bold text-gray-800">Personal info</h1>
          <p className="mt-1 text-sm font-normal text-gray-500">
            Update your photo and personal details here.
          </p>

          {/* Form Inputs */}
          <div className="flex flex-col mt-10 gap-y-10">
            {/* Wire frame */}
            <div className="flex items-center justify-between">
              <div className="w-[15rem] h-7 flex items-center">
                <h1 className="text-sm font-normal text-gray-700">Name</h1>
              </div>
              <div className="w-[31.25rem] h-11 flex items-center justify-between">
                <input
                  type="text"
                  className="h-full px-4 py-3 text-sm font-normal text-gray-700 border border-gray-300 rounded-lg outline-none w-fourty8"
                />
                <input
                  type="text"
                  className="h-full px-4 py-3 text-sm font-normal text-gray-700 border border-gray-300 rounded-lg outline-none w-fourty8"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-[15rem] h-7 flex items-center">
                <h1 className="text-sm font-normal text-gray-700">
                  Email address
                </h1>
              </div>
              <div className="w-[31.25rem] h-11 flex">
                <input
                  type="text"
                  className="w-full h-full px-4 py-3 text-sm font-normal text-gray-700 border border-gray-300 rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-[15rem] h-7 flex items-center">
                <h1 className="text-sm font-normal text-gray-700">
                  Phone number
                </h1>
              </div>
              <div className="w-[31.25rem] h-11 flex">
                <input
                  type="text"
                  className="w-full h-full px-4 py-3 text-sm font-normal text-gray-700 border border-gray-300 rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-[15rem] h-7 flex items-center">
                <h1 className="text-sm font-normal text-gray-700">Address</h1>
              </div>
              <div className="w-[31.25rem] h-11 flex">
                <input
                  type="text"
                  className="w-full h-full px-4 py-3 text-sm font-normal text-gray-700 border border-gray-300 rounded-lg outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-80">
        <Footer />
      </div>
    </div>
  );
}

export default Me;
