export default function createdTimeFormat(creationDate) {
    const accountDate = new Date(creationDate);
    const currentDate = new Date();
    let date = currentDate - accountDate;
    let minutes = Math.floor(date / (1000 * 60));
    let hours = Math.floor(minutes / 60)
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);

    if(years > 0) {
        return years == 1 ? "1 year ago" : years + " years ago" ;
    }
    if(months > 0) {
        return months == 1 ? "1 month ago" : months + " months ago" ;
    }
    if(days > 0) {
        return days == 1 ? "1 day ago" : days + " days ago" ;
    }
    if(hours > 0) {
        return hours == 1 ? "1 hour ago" : hours + " hours ago" ;
    }
    if(minutes > 0) {
        return minutes == 1 ? "1 minute ago" : minutes + " minutes ago" ;
    }
    return "just now";
}