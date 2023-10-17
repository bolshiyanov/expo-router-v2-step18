export function calculateNextPeriod(daysToAdd, timestamp) {
    const millisecondsInADay = 24 * 60 * 60 * 1000;
  
    // Calculate the new timestamp
    const newTimestamp = timestamp + daysToAdd * millisecondsInADay;
  
    // Convert newTimestamp to a Date object
    const dateObject = new Date(newTimestamp);
  
    // Format the date and time
    const formattedDate = dateObject.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  
    const formattedTime = dateObject.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    // Combine the formatted date and time
    const deliveryDateTime = `${formattedDate} ${formattedTime}`;
  
    return deliveryDateTime;
  }