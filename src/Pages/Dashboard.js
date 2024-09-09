import '../style/dashboard.css'


//required things to do, in api create a way to check listings, current and past
// do we have a way to see listings that are up and ones that were removed?
//both current and past listings can share the same card
export default function Dashboard() {
  return (
    <div className='dashboardPage'>
      <section className='curr-listings'>
        <p>Current listings</p>
      </section>
      <section className='past-Listings'>
        <h1>Past Listings</h1>
      </section>
    </div>
  )
}
