// CurrentProjects.jsx

const CurrentProjects = () => {
    return (
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Current Projects</h1>
        <div className="flex gap-6">
          <div className="flex-1 bg-gray-100 hover:bg-gray-200 p-10 rounded-lg shadow-md flex items-center justify-center transition-all cursor-pointer">
            <span className="text-lg font-semibold text-gray-600">Ongoing Projects</span>
          </div>
          <div className="flex-1 bg-gray-100 hover:bg-gray-200 border border-blue-400 p-10 rounded-lg shadow-md flex items-center justify-center transition-all cursor-pointer">
            <span className="text-lg font-semibold text-gray-600">Completion Report</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default CurrentProjects;
  