import React from 'react';
import { Formik, Form, Field } from "formik";

export const YearForm = (props) => {
    const { date, onChange, toMonth, fromMonth, styleClass, styleYearCalss, t, placeholder } = props
    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
        years.push(i);
    }

    const handleChange = function handleChange(e) {
        const { year, month } = e.target.form;
        if (year.value != '') {
            onChange(new Date(year.value));
        }
        else if (e.target.value == '') {
            onChange(e.target.value);
        }
        else if (e.target.value && date != '') {
            if (e.target.name == 'year')
                onChange(new Date(e.target.value, date.getMonth()), e.target.name);
        }
        else if (e.target.value && date == '') {

            if (e.target.name == 'year')
                onChange(new Date(e.target.value), e.target.name);
        }
    };

    return (
        <div className="input-group">
            <span className="input-group-addon">
                <i className="fa fa-calendar" aria-hidden="true"></i>
            </span>
            <Field component="select" name="year" onChange={handleChange} className={`${styleClass} ${styleYearCalss}`} value={(date != '') ? date.getFullYear() : ''}>
                {t && <option value=''>{placeholder}</option>}
                {years.sort((a, b) => b - a).map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </Field>
        </div>
    );
}