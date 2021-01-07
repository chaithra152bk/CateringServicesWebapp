import React from "react";
import { connect } from 'react-redux';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import Notification from '../notification/Notification';
import constant from "../../../shared/constant";
import SelectDropdown from "../../select/SelectDropdown";
import * as lookupActions from "../../../saga/lookup-saga";

const toast = new Notification()

class LookupCheckbox extends React.Component {

    constructor(props) {
        super(props)
        this.lookupIds = [];
        this.state = {
            categoryLookupIds: []
        }
        this.handleFetchLookupCallback()
    }

    handleFetchLookupCallback = () => {
        const { dispatch, lookupListName } = this.props;

        switch (lookupListName) {
            case 'industryCategoriesList':
                return dispatch(lookupActions.getIndustryWithCategoryRequest());
            default:
                return false;
        }
    }

    updateSelectedData(){
        const {selectedLookup} = this.props;
        if(selectedLookup)
            selectedLookup({categoryLookupIds: this.state.categoryLookupIds, lookupIds: this.lookupIds})
    }

    lookupListCheckbox = () => {
        const { lookupData, lookupListName } = this.props;
        const lookupList = lookupListName ? lookupData.get(lookupListName) : [];

        return (
            this.categoriesCheckboxList(lookupList)
        );
    };

    onChangeCategories = async (data) => {
        let id = data.id;
        if(!this.state.categoryLookupIds.includes(id)){
            this.setState({categoryLookupIds: [...this.state.categoryLookupIds, await id]})
        }
        else{
           this.removeCategories(id)
        }  
        this.updateSelectedData();
    }

    removeCategories =(removeId) => {
        let tempCategoryLookupIds = [...this.state.categoryLookupIds]; 
        let index = tempCategoryLookupIds.indexOf(removeId)
        if (index > -1) {
            tempCategoryLookupIds.splice(index, 1);
            this.setState({categoryLookupIds: tempCategoryLookupIds});
        }
    }

    categoriesCheckboxList = (list) => {
        return <ul className="advance-list">
            {list.map((item, i) => {
                let lookupKey = Object.keys(item)[2]
                return (
                    <li key={i}>
                        <span className="custom-checkbox">
                            <input
                                id={`cat_${lookupKey}_${item.id}`}
                                type="checkbox"
                                className="hideContactDetails cursor-pointer"
                                value={item.id}
                                onChange={(e) =>
                                    this.onChangeCategories(item)
                                }
                            />
                            <label htmlFor={`cat_${lookupKey}_${item.id}`} className="cursor-pointer">{item.name}</label>
                        </span>
                        {
                            this.state.categoryLookupIds.includes(item.id)  && item[lookupKey] && item[lookupKey].length > 0 ?
                                this.checkboxList(item[lookupKey], lookupKey) : null
                        }
                    </li>
                )
            })}
        </ul>
    }

    checkboxList = (list, type ) => {
        return <ul className="location-list">
            {list.map((item, i) => {
                return (
                    <li key={i}>
                        <span className="custom-checkbox">
                            <input
                                id={`inner_${type}_${item.id}`}
                                type="checkbox"
                                defaultChecked={this.lookupIds.includes(item.id)}
                                className="hideContactDetails cursor-pointer"
                                value={item.id}
                                onChange={(e) =>
                                    this.onChangeLookupIds(item)
                                }
                            />
                            <label htmlFor={`inner_${type}_${item.id}`} className="cursor-pointer">{item.name}</label>
                        </span>
                    </li>
                )
            })}
        </ul>
    }

    onChangeLookupIds = (data) => {
        let id = data.id;
        if (!this.lookupIds.includes(id)) {
            this.lookupIds.push(id);
        }
        else {
            this.removeLookup(id);
        }
        this.updateSelectedData();
    }

    removeLookup = (removeId) => {
        const index = this.lookupIds.indexOf(removeId);
        if (index > -1) {
            this.lookupIds.splice(index, 1);
        }
    }


    LookupSection = () => {
        return (
            <React.Fragment>
                <div className={`input-group`}>
                    {this.lookupListCheckbox()}
                </div>
            </React.Fragment>
        );
    };

    render() {
        return (
            this.LookupSection()
        );
    }
}

const mapStateToProps = state => ({
    lookupData: state.lookupData
});

export default connect(mapStateToProps)(LookupCheckbox);