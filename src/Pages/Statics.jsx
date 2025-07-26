import { Link } from "react-router-dom"

const Statics = () => {
  return (
    <div className="w-full flex justify-center items-center h-screen ">
         <div className="absolute inset-0 bg-[#0d0d0d] z-0" />

      {/* Dotted Background */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] opacity-20 z-0"/>
      <div className="flex flex-col items-center gap-6 text-slate-200 text-7xl animate-pulse duration-400">
        <h1>Coming Soon!</h1>
        <Link to="/">
          <button className="bg-white/90 hover:bg-white/80 font-semibold text-black px-4 py-2 rounded-md text-base">
            Go back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Statics
