export function dateToTimestamp(dateStr) {
    try {
        // Split the date and time parts
        const [datePart, timePart] = dateStr.split(' ');

        // Split the date into day, month, and year
        const [day, month, year] = datePart.split('/');

        // Split the time into hours and minutes
        const [hours, minutes] = timePart.split(':');

        // Create a new Date object with the provided date and time
        const date = new Date(year, month - 1, day, hours, minutes);

        // Get the timestamp in milliseconds
        const timestamp = date.getTime();

        return timestamp;
    } catch (error) {
        return "Invalid date format";
    }
}