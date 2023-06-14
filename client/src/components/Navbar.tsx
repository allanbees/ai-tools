const tabs: string[] = ['Home', 'Tools'];

const Navbar = () => {
  return (
    <nav className="flex justify-between mb-20 border-b-[0.5px] border-gray-300 px-10 py-3">
      <div className="flex gap-5">
        <h1 className="text-xl font-semibold font-mono cursor-pointer">
          AI Tools
        </h1>
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className=" text-gray-500 font-semibold hover:text-black transition-all"
          >
            {tab}
          </button>
        ))}
      </div>
      <button className="text-gray-500 font-semibold hover:text-black transition-all">
        Register
      </button>
    </nav>
  );
};

export default Navbar;
