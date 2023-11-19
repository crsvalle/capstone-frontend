
export default function Searchbar() {
  return (
<div className="w-11/12 md:w-8/12 xl:w-1/2 h-auto p-5 rounded-3xl bg-white flex flex-col shadow-md">
  <section className="w-full h-10 flex items-center">
    <input
      type="text"
      className="w-full h-full font-medium md:pl-2 focus:outline-none searchInput"
      placeholder="Search locations.."
    />
    <button className="w-28 h-full bg-blue-800 flex justify-center items-center rounded-2xl text-white font-medium"> Search</button>
  </section>
</div>
  )
}
