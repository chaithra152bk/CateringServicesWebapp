import React, { useState } from 'react';

export const YearMonthForm = (props) => {
    const {date, localeUtils, onChange, toMonth, fromMonth, styleClass, styleYearClass, t} = props
    const months = localeUtils.getMonths();
    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
        years.push(i);
    }

    const handleChange = function handleChange(e) {
        const { year, month } = e.target.form;
        onChange(new Date(year.value, month.value));   
    };

    function sortYearsArray(a, b) {
        return b - a;
    }

    return (
        <div className={`DayPicker-Caption`}>
            <select name="month" onChange={handleChange} className={`${styleClass&&styleClass}`} value={date.getMonth()}>
                {months.map((month, i) => (
                <option key={month} value={i}>
                    {month}
                </option>
                ))}
            </select>
            <select name="year" onChange={handleChange} className={`${styleClass&&styleClass}`} value={date.getFullYear()}>
                {years.map(year => (
                <option key={year} value={year}>
                    {year}
                </option>
                ))}
            </select>
        </div>
    );
}