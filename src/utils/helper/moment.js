import React from "react";
import * as moment from "moment";
import 'moment/locale/nb';
import constant from "../../shared/constant";
import * as sessionStorage from "../../utils/sessionStorage";

// const authData = JSON.parse(sessionStorage.getAuthToken());
// const userPreferred_language = 'nb';

// moment.locale(userPreferred_language);

const changeToLocal = (date) => {
    return moment.utc(date).local();
}

export const changeMomentLocale = (locale) => {
    if (locale) {
        return moment.locale(locale);
    }
}

export const getMonths = () => {
    return moment.months()
}

export const tabelHeaderDayString = (day, locale) => {
    if (locale) {
    } else if (moment.locale(locale) == "de") {
        return moment(day).format('dd DD.MM');
    } else {
        return moment(day).format('dd DD/MM');
    }
}

export const formatForApi = (date) => {
    return changeToLocal(date).format("YMMDD")
}

export const slotTime = (time, t) => {
    return time ? ` ${time} ${t('common.hour')}` : ''
}

export const numDate = (date) => {
    return date ? changeToLocal(date).format('LL LT') : '';
}

export const convertSlotTime = (dateTime) => {
    return moment(dateTime, "HH:mm:ss").format("hh:mm")
}

export const completeDateFormat = (date, time) => {
    return date && time ? `${changeToLocal(date).format("DD MMMM YYYY (dddd)")}, ${time}` : null;
}

export const normalDate = (date) => {
    return changeToLocal(date).format('D/M/YYYY')
}

export const displayDate = (date) => {
    return changeToLocal(date).format('LL')
}
export const displayDateAndTime = (date) => {
    return  changeToLocal(date).format('LL LT')
}

export const displayMonthYear = (date) => {
    // d.format('ddd MMM DD YYYY'); // 'Mon Feb 01 2016'
    return changeToLocal(date).format('MMM YYYY')
}

export const beforeOneWeek = (date) => {
    return new Date(new Date(date).getTime() - 60 * 60 * 24 * 7 * 1000)
}

export const betweenTwoDates = (d1, d2, t) => {
    let date1 = changeToLocal(d1);
    let date2 = changeToLocal(d2);

    let years = date2.diff(date1, constant.YEAR);
    let months = date2.diff(date1, constant.MONTHS);

    let displayTextYear = years > 1 ? t('common.years_text') : t('common.year_text');
    let displayTextMonth = months > 1 ? t('common.months_text') : t('common.month_text')
    return `${years} ${displayTextYear} ${months - years * 12} ${displayTextMonth}`;
} 