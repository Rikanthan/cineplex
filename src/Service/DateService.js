 class DateService{
    formatDateTime(string){
        let options = {year: 'numeric',month: 'long', day: 'numeric',hour: 'numeric',minute:'numeric',second: 'numeric'};
        return new Date(string).toLocaleDateString([],options);
    }

    formatDateToSave(string){
        let options = {year: 'numeric',month: 'long', day: 'numeric',hour: 'numeric',minute:'numeric',second: 'numeric'};
        return new Date(string).toISOString([],options);
    }

    formatDate(date){
        let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if(month.length < 2)
            month = '0' + month;
        if(day.length < 2)
            day = '0' + day;
        console.log([year,month, day,].join('-'));
        return [year,month,day].join('-');
    }

    formatTime(date){
        let d = new Date(date),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes(),
        seconds = '' + d.getSeconds();

        if(hours.length < 2)
            hours = '0' + hours;
        if(minutes.length < 2)
            minutes = '0' + minutes;
        if(seconds.length < 2)
            seconds = '0' + seconds;
        return [hours,minutes,seconds].join(':');
    }
}
export default new DateService