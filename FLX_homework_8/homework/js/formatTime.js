function formatTime(time) {
    let days = 0;
    let hours = 0;
    let minutes = 0;

    while (time !== 0) {
        if (time >= 1440) {
            time -= 1440;
            days++;
        } else if (time >= 60) {
            time -= 60;
            hours++;
        } else {
            minutes = time;
            break;
        }
    }

    return `${days} day(s) ${hours} hour(s) ${minutes} minute(s).`;
}

formatTime(120); // 0 day(s) 2 hour(s) 0 minute(s).
formatTime(59); // 0 day(s) 0 hour(s) 59 minute(s).
formatTime(3601); // 1 day(s) 0 hour(s) 1 minute(s).