import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useBlackoutDates from '../api/blackoutdates'; // Import the custom hook

export default function Calendar({ dateRange, setDateRange, listingId }) {
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
                let currentDate = startDate;

                while (currentDate <= endDate) {
                    dates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                return dates;
            });
            setDisabledDates(convertedDates);
        };

        if (blackoutDates.length > 0) {
            convertToDisabledDates();
        }
    }, [blackoutDates]);

    return (
        <div>
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
