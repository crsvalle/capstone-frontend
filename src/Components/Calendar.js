
import axios from "axios";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
const API = process.env.REACT_APP_API_URL;

export default function Calendar({ dateRange, setDateRange, listingId }) {
    const [blackoutDates, setBlackoutDates] = useState([]);
    const [disabledDates, setDisabledDates] = useState([]);
  
    const handleDateRangeChange = (ranges) => {
      setDateRange([ranges.selection]);
    };
  
    useEffect(() => {
      const fetchBlackoutDates = async () => {
        try {
          const response = await axios.get(`${API}/blackout/listing/${listingId}`);
          setBlackoutDates(response.data.blackoutDates);
        } catch (error) {
          console.error('Error fetching blackout dates:', error);
        }
      };
  
      fetchBlackoutDates();
    }, [listingId]);
  
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
  
      convertToDisabledDates();
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