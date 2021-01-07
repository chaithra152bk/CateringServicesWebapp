import React, { useState } from 'react';
import { Formik, Form, Field } from "formik";
import * as moment from "../../utils/helper/moment";
import constant from '../../shared/constant';

export const EndDateForm = (props) => {
    const { handleOnChange, styleClass, styleYearClass, t, endMonth, endYear, wrapperClass, addYear } = props
    const months = moment.getMonths();
    const yearsLimit = addYear?new Date().getFullYear()+addYear:new Date().getFullYear();
    const years = [];

    for (let i = new Date(constant.FROM_YEAR).getFullYear(); i <= yearsLimit; i += 1) {
        years.push(i);
    }

    function sortYearsArray(a, b) {
        return b - a;
    }

    return (
        <div className={`${wrapperClass&&wrapperClass}`}>
            <Field component="select" name="endMonth" onChange={(e) => handleOnChange(e.target.value, false)} value={endMonth} className={`${styleClass}`}>
                <option value="">{t('common.month')}</option>
                {months.map((month, i) => (
                    <option key={month} value={i + 1}>
                        {month}
                    </option>
                ))}
            </Field>
            <Field component="select" name="endYear" onChange={(e) => handleOnChange(e.target.value, true)} value={endYear} className={`${styleClass} ${styleYearClass}`}>
                <option value="">{t('common.year')}</option>
                {years.sort(sortYearsArray).map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </Field>
        </div>
    );
}