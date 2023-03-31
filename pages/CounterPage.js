import Count from "../components/Count";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Counter App</h1>
      <Count />
    </div>
  );
};

export default HomePage;
