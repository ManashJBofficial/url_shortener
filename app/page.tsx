const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter your text..."
        />
      </div>
    </div>
  );
};

export default Page;
