import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/theme/default.css';
import 'react-date-range/dist/styles.css';
import '../style/calendar.css'
import useBlackoutDates from '../api/blackoutdates'; // Import the custom hook


export default function Calendar({ dateRange, setDateRange, listingId, datesBooked }) {
    console.log(datesBooked)
    const { blackoutDates } = useBlackoutDates(listingId); // Using the custom hook

    const [disabledDates, setDisabledDates] = useState([]);

    const handleDateRangeChange = (ranges) => {
        setDateRange([ranges.selection]);
    };

    useEffect(() => {
        const convertToDisabledDates = () => {
            const convertedDates = blackoutDates.flatMap((range) => {
                const startDate = new Date(range.start_date);
                const endDate = new Date(range.end_date);
                const dates = [];
                let currentDate = new Date(startDate);
        
                while (currentDate <= endDate) {
                    dates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
        
                return dates;
            });

            let uniqueDatesWithoutBooked = convertedDates;

            if (datesBooked && datesBooked.start_date && datesBooked.end_date) {
                const bookedStartDate = new Date(datesBooked.start_date);
                const bookedEndDate = new Date(datesBooked.end_date);
                const bookedDates = [];
                let currentBookedDate = new Date(bookedStartDate);
        
                while (currentBookedDate <= bookedEndDate) {
                    bookedDates.push(new Date(currentBookedDate));
                    currentBookedDate.setDate(currentBookedDate.getDate() + 1);
                }
        
                const uniqueDates = [...new Set([...convertedDates, ...bookedDates])];
                uniqueDatesWithoutBooked = uniqueDates.filter(date => {
                    const currentDate = new Date(date);
                    const startDate = new Date(datesBooked.start_date);
                    const endDate = new Date(datesBooked.end_date);
                
                    return !(currentDate >= startDate && currentDate <= endDate);
                });
            }

            setDisabledDates(uniqueDatesWithoutBooked);
        };
        
        convertToDisabledDates();
    }, [blackoutDates, datesBooked]);
    
    

    return (
        <div className="">
            <DateRange
                editableDateInputs={true}
                onChange={handleDateRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                showDateDisplay={false}
                minDate={new Date()}
                disabledDates={disabledDates}

            />
        </div>
    );
}
