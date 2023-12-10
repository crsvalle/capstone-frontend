import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import Bookings from "./Bookings";
import PersonalListings from "./PersonalListings";
   
  export default function CustomTabs({userId}) {

    const data = [
      {
        label: "Your Listings",
        value: "listings",
        desc: '',
        component: <PersonalListings />
      },
   
      {
        label: "Booked",
        value: "booked",
        desc : '',
        component: <Bookings userId={userId} />, 
      },
   

    ];
   
    return (
      <Tabs id="custom-animation" value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc, component }) => (
            <TabPanel key={value} value={value}>
            {desc}
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    );
  }