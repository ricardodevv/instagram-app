import { getProviders, signIn as signInProviders } from "next-auth/react";
import Image from "next/image";

const signIn = ({ providers }) => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <article className="flex h-[650px] w-[800px]">
        <div
          className="bg-[url('https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png')]
         bg-no-repeat w-[450px]"
        ></div>
        <div className="flex-1 h-[35rem]">
          <div className="flex flex-col h-full mt-8 border border-gray-300 items-center">
            <div className="relative flex w-44 h-24 mt-2">
              <Image
                src="/instagramlogo.png"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <form action="" className="mt-5 w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full border-gray-300 rounded-[4px] placeholder:text-sm"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border-gray-300 rounded-[4px] placeholder:text-sm mt-1.5"
                />
              </div>

              <button className="w-full py-2 mt-2 bg-blue-600 text-white rounded-md width">
                Sign In
              </button>
            </form>
            <div className="relative">
              <hr className="w-64 border-gray-400 my-6" />
              <p className="absolute top-3 left-[100px] text-gray-500 bg-white px-4">
                O
              </p>
            </div>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() => signInProviders(provider.id)}
                  className="flex relative w-64 p-2 border border-gray-400 rounded-md justify-center"
                >
                  <p className="mr-2 text-gray-600">
                    Sign in with {provider.name}
                  </p>
                  <div className="w-6 h-6 relative">
                    <Image
                      src="/googleicon.svg"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signInProviders(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}
    </div>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default signIn;
